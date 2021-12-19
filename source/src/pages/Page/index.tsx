import { useState } from "react"
import { Helmet } from "react-helmet-async"
import { useLocation } from "react-router-dom"
import styled from "styled-components"

import { FetchedPage, Map } from "../../../types/typing"

import MainContent from "../../components/MainContent"
import Loading from "../../components/Loading"
import TagList from "../../components/TagList"
import Tag from "../../components/Tag"
import NotFound from "../NotFound"

import NextPrevButtons from "./NextPrevButtons"
import Meta from "./Meta"
import Toc from "./Toc"

import _map from "../../data/map.json"
import { useEffect } from "react"

const map: Map = _map

const StyledPage = styled(MainContent)`
	padding-top: 0;
`

const StyledTitle = styled.h1`
	margin-bottom: 1rem;
`

interface SeriesData {
	seriesHome: string
	prev?: string
	next?: string
}

const Page = () => {
	const [fetchedPage, setFetchPage] = useState<FetchedPage | undefined>(
		undefined
	)
	const [isPageUnsearchable, setIsPageUnsearchable] = useState(false)
	const [isSeries, setIsSeries] = useState(false)
	const [seriesData, setSeriesData] = useState<SeriesData | undefined>(
		undefined
	)
	const [isLoading, setIsLoading] = useState(true)
	const location = useLocation()

	const fetchContent = async (
		isContentUnsearchable: boolean,
		url: string
	) => {
		return isContentUnsearchable
			? await import(`../../data/content/unsearchable${url}.json`)
			: await import(`../../data/content${url}.json`)
	}

	useEffect(() => {
		let _isSeries = false
		const url = location.pathname.replace(/\/$/, "") // remove trailing slash
		if (url.startsWith("/series")) _isSeries = true

		if (_isSeries) {
			const seriesURL = url.slice(0, url.lastIndexOf("/"))
			if (seriesURL in map.series) {
				const _curr: number = map.series[seriesURL].order.indexOf(url)
				const _prev = _curr - 1
				const _next = _curr + 1

				setSeriesData({
					seriesHome: seriesURL,
					prev:
						_prev >= 0
							? map.series[seriesURL].order[_prev]
							: undefined,
					next:
						_next < map.series[seriesURL].order.length
							? map.series[seriesURL].order[_next]
							: undefined,
				})
			}
		}

		// fetch page
		const MapPost = map.posts[url]
		const fetchedPage: FetchedPage = {
			...MapPost,
			toc: undefined,
			content: "",
			tags: [] as string[],
		}

		let _isUnsearchable = false
		if (!MapPost) {
			_isUnsearchable = true
			setIsPageUnsearchable(_isUnsearchable)

			if (!map.unsearchable[url]) {
				setIsLoading(false)
				return
			}
		}

		fetchContent(_isUnsearchable, url).then((fetched_content) => {
			fetchedPage.content = fetched_content.content || "No content"
			fetchedPage.toc = fetched_content.toc
			fetchedPage.title = _isUnsearchable
				? map.unsearchable[url].title
				: fetchedPage?.title || "No title"

			if (!_isUnsearchable)
				fetchedPage.date = fetchedPage?.date || "Unknown date"

			setIsSeries(_isSeries)
			setFetchPage(fetchedPage)
			setIsLoading(false)
		})
	}, [location])

	if (isLoading) return <Loading />

	if (!fetchedPage) return <NotFound />

	return (
		<>
			<Helmet>
				<title>pomp | {fetchedPage.title}</title>

				<meta property="og:title" content={fetchedPage.title} />
				<meta property="og:type" content="website" />
				<meta
					property="og:image"
					content={`${process.env.PUBLIC_URL}/icon/icon.svg`}
				/>
			</Helmet>

			<StyledPage>
				{isSeries ? (
					<NextPrevButtons
						prevURL={seriesData?.prev}
						nextURL={seriesData?.next}
					/>
				) : (
					<br />
				)}
				<StyledTitle>{fetchedPage.title}</StyledTitle>

				<small>
					{/* Post tags */}
					{!!fetchedPage.tags.length && (
						<TagList direction="left">
							{fetchedPage.tags.map((tag) => {
								return (
									<td key={fetchedPage?.title + tag}>
										<Tag text={tag} />
									</td>
								)
							})}
						</TagList>
					)}

					<br />

					{/* Post metadata */}
					{!isPageUnsearchable && <Meta fetchedPage={fetchedPage} />}
				</small>

				<hr />

				{/* add table of contents if it exists */}
				<Toc data={fetchedPage.toc} />

				{/* page content */}
				<div
					dangerouslySetInnerHTML={{
						__html: fetchedPage.content,
					}}
				/>
			</StyledPage>
		</>
	)
}

export default Page
