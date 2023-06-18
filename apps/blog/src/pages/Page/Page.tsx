import { useState, useEffect } from "react"
import { Helmet } from "react-helmet-async"
import { useLocation } from "react-router-dom"
import styled from "styled-components"

import GithubLinkIcon from "../../components/GithubLinkIcon"
import MainContent from "../../components/MainContent"
import PostCard from "../../components/PostCard"
import Loading from "../../components/Loading"
import TagList from "../../components/TagList"
import Badge from "../../components/Badge"
import Tag from "../../components/Tag"
import NotFound from "../NotFound"

import SeriesControlButtons from "./SeriesControlButtons"
import {
	categorizePageType,
	fetchContent,
	PageType,
	parsePageData,
} from "./helper"
import Meta from "./Meta"
import Toc from "./Toc"

import type { PageData } from "@developomp-site/blog-content/src/types/types"

import contentMap from "../../contentMap"

const StyledTitle = styled.h1<{ pageType: PageType }>`
	margin-bottom: 1rem;

	word-wrap: break-word;

	${(props) => {
		if (props.pageType == PageType.PORTFOLIO_PROJECT) {
			return "margin-right: 3rem;"
		}
	}}
`

const PortfolioGithubLinkContainer = styled.div`
	float: right;
	margin-top: 1rem;
`

const ProjectImage = styled.img`
	max-width: 100%;
`

export default function Page() {
	const { pathname } = useLocation()

	const [pageData, setPageData] = useState<PageData | undefined>(undefined)
	const [pageType, setPageType] = useState<PageType>(PageType.POST)
	const [isLoading, setIsLoading] = useState(true)

	// this code runs if either the url or the locale changes
	useEffect(() => {
		const content_id = pathname.replace(/\/$/, "") // remove trailing slash
		const pageType = categorizePageType(content_id)

		fetchContent(pageType, content_id).then((fetched_content) => {
			if (!fetched_content) {
				// stop loading without fetching pageData so 404 page will display
				setIsLoading(false)

				return
			}

			setPageData(parsePageData(fetched_content, pageType, content_id))
			setPageType(pageType)
			setIsLoading(false)
		})
	}, [pathname])

	if (isLoading) return <Loading />

	if (!pageData) return <NotFound />

	return (
		<>
			<Helmet>
				<title>pomp | {pageData.title}</title>

				<meta property="og:title" content={pageData.title} />
				<meta property="og:type" content="website" />
				<meta property="og:image" content="/icon/icon.svg" />
			</Helmet>

			<MainContent>
				{/* next/previous series post buttons */}
				{pageType == PageType.SERIES && (
					<SeriesControlButtons
						seriesHome={pageData.seriesHome}
						prevURL={pageData.prev}
						nextURL={pageData.next}
					/>
				)}

				{pageType == PageType.PORTFOLIO_PROJECT && pageData.repo && (
					<PortfolioGithubLinkContainer>
						<GithubLinkIcon link={pageData.repo} />
					</PortfolioGithubLinkContainer>
				)}
				<StyledTitle pageType={PageType.PORTFOLIO_PROJECT}>
					{pageData.title}
				</StyledTitle>

				{pageType == PageType.PORTFOLIO_PROJECT &&
					pageData.badges.map((badge) => <Badge key={badge} slug={badge} />)}

				<small>
					{/* Post tags */}
					{pageData.tags.length > 0 && (
						<TagList direction="left">
							{pageData.tags.map((tag) => {
								return (
									<div key={pageData?.title + tag}>
										<Tag text={tag} />
									</div>
								)
							})}
						</TagList>
					)}

					<br />

					{/* Post metadata */}
					{[PageType.POST, PageType.SERIES, PageType.SERIES_HOME].includes(
						pageType
					) && <Meta fetchedPage={pageData} />}
				</small>

				<hr />

				{/* add table of contents if it exists */}
				<Toc data={pageData.toc} />

				{pageType == PageType.PORTFOLIO_PROJECT && (
					<ProjectImage src={pageData.image} alt="project example image" />
				)}

				{/* page content */}
				<div
					dangerouslySetInnerHTML={{
						__html: pageData.content,
					}}
				/>
			</MainContent>

			{/* series post list */}

			{pageType == PageType.SERIES_HOME &&
				pageData.order.map((post) => {
					return (
						<PostCard
							key={post}
							postData={{
								content_id: post,
								...contentMap.posts[post],
							}}
						/>
					)
				})}
		</>
	)
}
