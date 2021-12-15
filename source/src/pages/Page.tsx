import { useState } from "react"
import { Helmet } from "react-helmet-async"
import { Link, useLocation } from "react-router-dom"
import styled from "styled-components"
import { HashLink } from "react-router-hash-link"
import { Collapse } from "react-collapse"
import storage from "local-storage-fallback"

import { TocElement, FetchedPage, Map } from "../types/typings"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	faBook,
	faCalendar,
	faCaretDown,
	faCaretUp,
	faHourglass,
} from "@fortawesome/free-solid-svg-icons"

import Tag from "../components/Tag"
import TagList from "../components/TagList"
import NotFound from "./NotFound"
import Loading from "../components/Loading"

import theming from "../theming"

import _map from "../data/map.json"
import { useEffect } from "react"

const map: Map = _map

const StyledTitle = styled.h1`
	margin-bottom: 1rem;
`

const StyledNextPrevContainer = styled.div`
	display: flex;
	justify-content: space-between;
	size: 100%;
`

const StyledLink = styled(Link)`
	${theming.styles.navbarButtonStyle}

	background-color: ${(props) =>
		theming.theme(props.theme.currentTheme, {
			light: "#EEEEEE",
			dark: "#202225",
		})};

	height: 1rem;
	width: 2rem;
	margin-top: 2rem;

	line-height: 1rem;
	text-align: center;
`

const StyledDisabledLink = styled.div`
	font-size: 1rem;
	border-radius: 0.5rem;
	float: left;
	padding: 14px 16px;
	text-decoration: none;
	transition: transform 0.1s linear;
	color: grey;
	background-color: ${(props) =>
		theming.theme(props.theme.currentTheme, {
			light: "#EEEEEE",
			dark: "#202225",
		})};

	height: 1rem;
	width: 2rem;
	margin-top: 2rem;

	line-height: 1rem;
	text-align: center;
	user-select: none;
`

const StyledTocToggleButton = styled.button`
	border: none;
	text-align: left;
	background-color: rgba(0, 0, 0, 0);
	width: 100%;
	padding: 0.5rem;
	color: ${(props) =>
		theming.theme(props.theme.currentTheme, {
			light: "black",
			dark: "white",
		})};
`

const StyledCollapseContainer = styled.div`
	* {
		transition: height 200ms ease-out;
	}
`

const StyledMetaContainer = styled.div`
	color: ${(props) =>
		theming.theme(props.theme.currentTheme, {
			light: "#555",
			dark: "#CCC",
		})};
`

function parseToc(tocData: TocElement[]) {
	return (
		<ol>
			{tocData.map((elem) => (
				// use elem.lvl
				<li key={elem.slug}>
					<HashLink smooth to={location.pathname + "#" + elem.slug}>
						{elem.content}
					</HashLink>
				</li>
			))}
		</ol>
	)
}

const NextPrevButton = (props: { prevURL?: string; nextURL?: string }) => {
	return (
		<StyledNextPrevContainer>
			{props.prevURL ? (
				<StyledLink to={props.prevURL}>prev</StyledLink>
			) : (
				<StyledDisabledLink>prev</StyledDisabledLink>
			)}
			{props.nextURL ? (
				<StyledLink to={props.nextURL}>next</StyledLink>
			) : (
				<StyledDisabledLink>next</StyledDisabledLink>
			)}
		</StyledNextPrevContainer>
	)
}

const PostMeta = (props: { fetchedPage: FetchedPage }) => {
	return (
		<StyledMetaContainer>
			<FontAwesomeIcon icon={faCalendar} />
			&nbsp;&nbsp;&nbsp;
			{props.fetchedPage.date || "Unknown date"}
			&nbsp;&nbsp;&nbsp;&nbsp;
			<FontAwesomeIcon icon={faHourglass} />
			&nbsp;&nbsp;&nbsp;
			{props.fetchedPage.readTime
				? props.fetchedPage.readTime + " read"
				: "unknown length"}
			&nbsp;&nbsp;&nbsp;&nbsp;
			<FontAwesomeIcon icon={faBook} />
			&nbsp;&nbsp;&nbsp;
			{props.fetchedPage.wordCount
				? props.fetchedPage.wordCount + " words"
				: "unknown words"}
		</StyledMetaContainer>
	)
}

const PageTOC = (props: { fetchedPage: FetchedPage }) => {
	const [isTocOpened, setIsTocOpened] = useState(
		storage.getItem("isTocOpened") == "true"
	)

	useEffect(() => {
		storage.setItem("isTocOpened", isTocOpened.toString())
	}, [isTocOpened])

	return (
		<>
			<StyledTocToggleButton
				onClick={() => {
					setIsTocOpened((prev) => !prev)
				}}
			>
				<strong>Table of Content </strong>
				{isTocOpened ? (
					<FontAwesomeIcon icon={faCaretUp} />
				) : (
					<FontAwesomeIcon icon={faCaretDown} />
				)}
			</StyledTocToggleButton>
			<StyledCollapseContainer>
				<Collapse isOpened={isTocOpened}>
					<div className="white-link">{props.fetchedPage.toc}</div>
				</Collapse>
			</StyledCollapseContainer>
			<hr />
		</>
	)
}

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
			? await import(`../data/content/unsearchable${url}.json`)
			: await import(`../data/content${url}.json`)
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
			fetchedPage.content = fetched_content.content
				? fetched_content.content
				: "No content"
			fetchedPage.toc = fetched_content.toc
				? parseToc(fetched_content.toc)
				: undefined
			fetchedPage.title = _isUnsearchable
				? map.unsearchable[url].title
				: fetchedPage?.title
				? fetchedPage.title
				: "No title"

			if (!_isUnsearchable) {
				fetchedPage.date = fetchedPage?.date
					? fetchedPage.date
					: "Unknown date"
			}

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

			<div className="card main-content" style={{ paddingTop: 0 }}>
				{isSeries ? (
					<NextPrevButton
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
					{!isPageUnsearchable && (
						<PostMeta fetchedPage={fetchedPage} />
					)}
				</small>

				<hr />

				{/* add table of contents if it exists */}
				{!!fetchedPage.toc?.props.children.length && (
					<PageTOC fetchedPage={fetchedPage} />
				)}

				{/* page content */}
				<div
					className="white-link"
					dangerouslySetInnerHTML={{
						__html: fetchedPage.content,
					}}
				/>
			</div>
		</>
	)
}

export default Page
