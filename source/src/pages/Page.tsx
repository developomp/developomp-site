import React from "react"
import { Helmet } from "react-helmet-async"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { HashLink } from "react-router-hash-link"
import { Collapse } from "react-collapse"
import storage from "local-storage-fallback"

import theming from "../theming"

import Tag from "../components/Tag"
import TagList from "../components/TagList"
import NotFound from "./NotFound"
import Spinner from "../components/Spinner"

import _map from "../data/map.json"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	faBook,
	faCalendar,
	faCaretDown,
	faCaretUp,
	faHourglass,
} from "@fortawesome/free-solid-svg-icons"

import { TocElement, FetchedPage, Map } from "../types/typings"

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

interface PageProps {}

interface PageState {
	fetchedPage?: FetchedPage
	isUnsearchable: boolean
	isSeries: boolean
	seriesData: {
		seriesHome: string
		prev: string | null
		next: string | null
	} | null
	isTocOpened: boolean
	loading: boolean
}

interface NextPrevProps {
	prevURL: string | null
	nextURL: string | null
}

class NextPrev extends React.Component<NextPrevProps> {
	render() {
		return (
			<StyledNextPrevContainer>
				{this.props.prevURL ? (
					<StyledLink to={this.props.prevURL}>prev</StyledLink>
				) : (
					<StyledDisabledLink>prev</StyledDisabledLink>
				)}
				{this.props.nextURL ? (
					<StyledLink to={this.props.nextURL}>next</StyledLink>
				) : (
					<StyledDisabledLink>next</StyledDisabledLink>
				)}
			</StyledNextPrevContainer>
		)
	}
}

export default class Page extends React.Component<PageProps, PageState> {
	constructor(props: PageProps) {
		super(props)

		this.state = {
			fetchedPage: undefined,
			isUnsearchable: false,
			isSeries: false,
			seriesData: null,
			isTocOpened: storage.getItem("isTocOpened") == "true",
			loading: true,
		}
	}

	componentDidUpdate(_: PageProps, prevState: PageState) {
		if (this.state.isTocOpened !== prevState.isTocOpened) {
			storage.setItem("isTocOpened", this.state.isTocOpened.toString())
		}
	}

	async componentDidMount() {
		let _isUnsearchable = false
		let _isSeries = false

		const url = location.pathname.replace(/\/$/, "") // remove trailing slash

		if (url.startsWith("/series")) _isSeries = true

		if (_isSeries) {
			const seriesURL = url.slice(0, url.lastIndexOf("/"))
			if (seriesURL in map.series) {
				const _curr: number = map.series[seriesURL].order.indexOf(url)
				let _prev: number | null = _curr - 1
				let _next: number | null = _curr + 1

				if (_prev < 0) _prev = null
				if (_next > map.series[seriesURL].order.length - 1) _next = null

				this.setState({
					seriesData: {
						seriesHome: seriesURL,
						prev:
							_prev != null
								? map.series[seriesURL].order[_prev]
								: null,
						next:
							_next != null
								? map.series[seriesURL].order[_next]
								: null,
					},
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

		if (!MapPost) {
			_isUnsearchable = true
			this.setState({ isUnsearchable: _isUnsearchable })

			if (!map.unsearchable[url]) {
				this.setState({ loading: false })
				return
			}
		}

		const fetched_content = _isUnsearchable
			? await import(`../data/content/unsearchable${url}.json`)
			: await import(`../data/content${url}.json`)

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

		this.setState({
			isSeries: _isSeries,
			fetchedPage: fetchedPage,
			loading: false,
		})
	}

	render() {
		if (this.state.loading) return <Spinner size={200} />
		if (!this.state.fetchedPage) return <NotFound />

		return (
			<>
				<Helmet>
					<title>pomp | {this.state.fetchedPage.title}</title>

					<meta
						property="og:title"
						content={this.state.fetchedPage.title}
					/>
					<meta property="og:type" content="website" />
					<meta
						property="og:image"
						content={`${process.env.PUBLIC_URL}/icon/icon.svg`}
					/>
				</Helmet>

				<div
					className="card main-content"
					style={{
						paddingTop: 0,
					}}
				>
					{this.state.isSeries ? (
						<NextPrev
							prevURL={this.state.seriesData?.prev || null}
							nextURL={this.state.seriesData?.next || null}
						/>
					) : (
						<br />
					)}
					<StyledTitle>{this.state.fetchedPage.title}</StyledTitle>

					{/* Post tags */}
					<small>
						<TagList direction="left">
							{this.state.fetchedPage.tags ? (
								this.state.fetchedPage.tags.map((tag) => {
									return (
										<td
											key={
												this.state.fetchedPage?.title +
												tag
											}
										>
											<Tag text={tag} />
										</td>
									)
								})
							) : (
								<></>
							)}
						</TagList>

						<br />

						{!this.state.isUnsearchable && (
							<StyledMetaContainer>
								<FontAwesomeIcon icon={faCalendar} />
								&nbsp;&nbsp;&nbsp;
								{this.state.fetchedPage?.date || "Unknown date"}
								&nbsp;&nbsp;&nbsp;&nbsp;
								<FontAwesomeIcon icon={faHourglass} />
								&nbsp;&nbsp;&nbsp;
								{this.state.fetchedPage?.readTime
									? this.state.fetchedPage?.readTime + " read"
									: "unknown length"}
								&nbsp;&nbsp;&nbsp;&nbsp;
								<FontAwesomeIcon icon={faBook} />
								&nbsp;&nbsp;&nbsp;
								{this.state.fetchedPage?.wordCount
									? this.state.fetchedPage.wordCount +
									  " words"
									: "unknown words"}
							</StyledMetaContainer>
						)}
					</small>

					<hr />

					{
						// add table of contents if it exists
						!!this.state.fetchedPage?.toc?.props.children
							.length && (
							<>
								<StyledTocToggleButton
									onClick={() => {
										this.setState({
											isTocOpened:
												!this.state.isTocOpened,
										})
									}}
								>
									<strong>Table of Content </strong>
									{this.state.isTocOpened ? (
										<FontAwesomeIcon icon={faCaretUp} />
									) : (
										<FontAwesomeIcon icon={faCaretDown} />
									)}
								</StyledTocToggleButton>
								<StyledCollapseContainer>
									<Collapse isOpened={this.state.isTocOpened}>
										<div className="white-link">
											{this.state.fetchedPage.toc}
										</div>
									</Collapse>
								</StyledCollapseContainer>
								<hr />
							</>
						)
					}

					<div
						className="white-link"
						dangerouslySetInnerHTML={{
							__html: this.state.fetchedPage.content,
						}}
					/>
				</div>
			</>
		)
	}
}
