import { useState } from "react"
import { Helmet } from "react-helmet-async"
import { useLocation } from "react-router-dom"
import styled from "styled-components"

import { PageData, Map } from "../../../types/types"

import MainContent from "../../components/MainContent"
import Loading from "../../components/Loading"
import TagList from "../../components/TagList"
import Tag from "../../components/Tag"
import NotFound from "../NotFound"

import NextPrevButtons from "./NextPrevButtons"
import Meta from "./Meta"
import Toc from "./Toc"

import portfolio from "../../data/portfolio.json"
import _map from "../../data/map.json"
import { useEffect } from "react"

const map: Map = _map

const StyledTitle = styled.h1`
	margin-bottom: 1rem;
`

enum PageType {
	POST,
	SERIES,
	PORTFOLIO_PROJECT,
	UNSEARCHABLE,
}

interface SeriesData {
	seriesHome: string
	prev?: string
	next?: string
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

	// only used when the page is a series post
	// todo: merge with pageData
	const [seriesData, setSeriesData] = useState<SeriesData | undefined>(
		undefined
	)

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

					setSeriesData({
						seriesHome: seriesURL,
						prev:
							prev >= 0
								? map.series[seriesURL].order[prev]
								: undefined,
						next:
							next < map.series[seriesURL].order.length
								? map.series[seriesURL].order[next]
								: undefined,
					})

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

				case PageType.PORTFOLIO_PROJECT: {
					const data =
						portfolio.projects[
							url as keyof typeof portfolio.projects
						]

					console.log(fetched_content)

					pageData.content = fetched_content.content
					pageData.toc = fetched_content.toc

					pageData.title = data.name

					// todo: add portfolio data
					/*
						"image": "/img/portfolio/developomp.com.png",
						"overview": "my website for blogging, portfolio, and resume.",
						"badges": [
							"typescript",
							"javascript",
							"nodedotjs",
							"firebase",
							"react",
							"html5",
							"css3"
						],
						"repo": "https://github.com/developomp/developomp-site"
					*/

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
					content={`${process.env.PUBLIC_URL}/icon/icon.svg`}
				/>
			</Helmet>

			<MainContent>
				{pageType == PageType.SERIES ? (
					<NextPrevButtons
						prevURL={seriesData?.prev}
						nextURL={seriesData?.next}
					/>
				) : (
					<br />
				)}
				<StyledTitle>{pageData.title}</StyledTitle>

				<small>
					{/* Post tags */}
					{!!pageData.tags.length && (
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
					{pageType != PageType.UNSEARCHABLE && (
						<Meta fetchedPage={pageData} />
					)}
				</small>

				<hr />

				{/* add table of contents if it exists */}
				<Toc data={pageData.toc} />

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
