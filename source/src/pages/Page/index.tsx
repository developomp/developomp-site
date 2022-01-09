import { useState } from "react"
import { Helmet } from "react-helmet-async"
import { useLocation } from "react-router-dom"
import styled from "styled-components"

import { PageData, Map } from "../../../types/types"

import GithubLinkIcon from "../../components/GithubLinkIcon"
import MainContent from "../../components/MainContent"
import Loading from "../../components/Loading"
import TagList from "../../components/TagList"
import Badge from "../../components/Badge"
import Tag from "../../components/Tag"
import NotFound from "../NotFound"

import NextPrevButtons from "./NextPrevButtons"
import Meta from "./Meta"
import Toc from "./Toc"

import portfolio from "../../data/portfolio.json"
import _map from "../../data/map.json"
import { useEffect } from "react"

const map: Map = _map

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

enum PageType {
	POST,
	SERIES,
	PORTFOLIO_PROJECT,
	UNSEARCHABLE,
}

const fetchContent = async (pageType: PageType, url: string) => {
	try {
		if (pageType == PageType.UNSEARCHABLE) {
			return await import(`../../data/content/unsearchable${url}.json`)
		}

		return await import(`../../data/content${url}.json`)
	} catch (err) {
		return
	}
}

const categorizePageType = (url: string): PageType => {
	if (url.startsWith("/post")) return PageType.POST
	if (url.startsWith("/series")) return PageType.SERIES
	if (url.startsWith("/portfolio")) return PageType.PORTFOLIO_PROJECT

	return PageType.UNSEARCHABLE
}

const Page = () => {
	const location = useLocation()

	const [pageData, setPageData] = useState<PageData | undefined>(undefined)
	const [pageType, setPageType] = useState<PageType>(PageType.POST)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const url = location.pathname.replace(/\/$/, "") // remove trailing slash
		const _pageType = categorizePageType(url)

		/**
		 * Test if url is a valid one
		 */

		let show404 = false
		switch (_pageType) {
			case PageType.POST: {
				if (!map.posts[url]) show404 = true

				break
			}

			case PageType.SERIES: {
				if (!(url.slice(0, url.lastIndexOf("/")) in map.series))
					show404 = true

				break
			}

			case PageType.PORTFOLIO_PROJECT: {
				if (!(url in portfolio.projects)) show404 = true

				break
			}

			case PageType.UNSEARCHABLE: {
				if (!map.unsearchable[url]) show404 = true

				break
			}
		}

		if (show404) {
			setIsLoading(false)
			return
		}

		/**
		 * Get page data
		 */

		const pageData: PageData = {
			title: "No title",
			date: "Unknown date",
			readTime: "Unknown read time",
			wordCount: 0,
			tags: [],
			toc: undefined,
			content: "No content",

			seriesHome: "",

			image: "",
			overview: "",
			badges: [],
			repo: "",
		}

		fetchContent(_pageType, url).then((fetched_content) => {
			if (!fetched_content) {
				setIsLoading(false)
				return
			}

			switch (_pageType) {
				case PageType.POST: {
					const post = map.posts[url]

					pageData.content = fetched_content.content
					pageData.toc = fetched_content.toc

					pageData.title = post.title
					pageData.date = post.date
					pageData.readTime = post.readTime
					pageData.wordCount = post.wordCount
					pageData.tags = post.tags || []

					break
				}

				case PageType.SERIES: {
					const seriesURL = url.slice(0, url.lastIndexOf("/"))

					const curr = map.series[seriesURL].order.indexOf(url)
					const prev = curr - 1
					const next = curr + 1

					const post = map.posts[url]

					pageData.content = fetched_content.content
					pageData.toc = fetched_content.toc

					pageData.title = post.title
					pageData.date = post.date
					pageData.readTime = post.readTime
					pageData.wordCount = post.wordCount
					pageData.tags = post.tags || []

					pageData.seriesHome = seriesURL
					pageData.prev =
						prev >= 0
							? map.series[seriesURL].order[prev]
							: undefined
					pageData.next =
						next < map.series[seriesURL].order.length
							? map.series[seriesURL].order[next]
							: undefined

					break
				}

				case PageType.PORTFOLIO_PROJECT: {
					const data =
						portfolio.projects[
							url as keyof typeof portfolio.projects
						]

					pageData.content = fetched_content.content
					pageData.toc = fetched_content.toc

					pageData.title = data.name
					pageData.image = data.image
					pageData.overview = data.overview
					pageData.badges = data.badges
					pageData.repo = data.repo

					break
				}

				case PageType.UNSEARCHABLE: {
					pageData.title = map.unsearchable[url].title
					pageData.content = fetched_content.content

					break
				}
			}

			setPageType(_pageType)
			setPageData(pageData)

			setIsLoading(false)
		})
	}, [location])

	if (isLoading) return <Loading />

	if (!pageData) return <NotFound />

	return (
		<>
			<Helmet>
				<title>pomp | {pageData.title}</title>

				<meta property="og:title" content={pageData.title} />
				<meta property="og:type" content="website" />
				<meta
					property="og:image"
					content={process.env.PUBLIC_URL + "/icon/icon.svg"}
				/>
			</Helmet>

			<MainContent>
				{/* next/previous series post buttons */}
				{pageType == PageType.SERIES && (
					<NextPrevButtons
						prevURL={pageData.prev}
						nextURL={pageData.next}
					/>
				)}

				{pageType == PageType.PORTFOLIO_PROJECT && (
					<PortfolioGithubLinkContainer>
						<GithubLinkIcon link={pageData.repo} />
					</PortfolioGithubLinkContainer>
				)}
				<StyledTitle pageType={PageType.PORTFOLIO_PROJECT}>
					{pageData.title}
				</StyledTitle>

				{pageType == PageType.PORTFOLIO_PROJECT &&
					pageData.badges.map((badge) => (
						<Badge key={badge} slug={badge} />
					))}

				<small>
					{/* Post tags */}
					{pageData.tags.length > 0 && (
						<TagList direction="left">
							{pageData.tags.map((tag) => {
								return (
									<td key={pageData?.title + tag}>
										<Tag text={tag} />
									</td>
								)
							})}
						</TagList>
					)}

					<br />

					{/* Post metadata */}
					{[PageType.UNSEARCHABLE, PageType.POST].includes(
						pageType
					) && <Meta fetchedPage={pageData} />}
				</small>

				<hr />

				{/* add table of contents if it exists */}
				<Toc data={pageData.toc} />

				{pageType == PageType.PORTFOLIO_PROJECT && (
					<ProjectImage
						src={pageData.image}
						alt="project example image"
					/>
				)}

				{/* page content */}
				<div
					dangerouslySetInnerHTML={{
						__html: pageData.content,
					}}
				/>
			</MainContent>
		</>
	)
}

export default Page
