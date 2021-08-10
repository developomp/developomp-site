import React from "react"
import marked from "marked"
import { Helmet } from "react-helmet-async"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { Collapse } from "react-collapse"
import storage from "local-storage-fallback"

import theming from "../theming"

import Tag from "../components/Tag"
import TagList from "../components/TagList"
import NotFound from "./NotFound"
import Spinner from "../components/Spinner"

import map from "../data/map.json"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	faBook,
	faCalendar,
	faCaretDown,
	faCaretUp,
	faHourglass,
} from "@fortawesome/free-solid-svg-icons"

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
	background-color: rgba(0, 0, 0, 0);
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

interface PageProps {}

interface PageState {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	fetchedPage: any
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
	constructor(props) {
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

	componentDidUpdate(_, prevState) {
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
		let fetchedPage = map.posts[url]
		if (!fetchedPage) {
			fetchedPage = map.unsearchable[url]

			_isUnsearchable = true
			this.setState({ isUnsearchable: true })

			if (!fetchedPage) {
				this.setState({
					loading: false,
				})
				return
			}
		}

		const fetched_content = _isUnsearchable
			? (await import(`../data/content/unsearchable${url}.json`)).content
			: (await import(`../data/content${url}.json`)).content

		fetchedPage.content = fetched_content ? fetched_content : "No content"
		fetchedPage.toc = fetchedPage?.toc ? fetchedPage.toc : undefined
		fetchedPage.title = fetchedPage?.title ? fetchedPage.title : "No title"
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
		if (this.state.loading) {
			return <Spinner size={200} />
		} else {
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
						<StyledTitle>
							{this.state.fetchedPage.title}
						</StyledTitle>
						{/* Post tags */}
						<small>
							<TagList direction="left">
								{this.state.fetchedPage.tags ? (
									this.state.fetchedPage.tags.map((tag) => {
										return (
											<td
												key={
													this.state.fetchedPage
														.title + tag
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
							{this.state.isUnsearchable ? (
								<></>
							) : (
								<>
									<FontAwesomeIcon icon={faCalendar} />{" "}
									Published on {this.state.fetchedPage.date}
									&nbsp;&nbsp;&nbsp;&nbsp;
									<FontAwesomeIcon icon={faHourglass} />{" "}
									{this.state.fetchedPage.readTime} read
									&nbsp;&nbsp;&nbsp;&nbsp;
									<FontAwesomeIcon icon={faBook} />{" "}
									{this.state.fetchedPage.wordCount} words
								</>
							)}
						</small>
						{/* Horizontal Separator */}

						<hr />

						<strong>Table of Content </strong>
						<StyledTocToggleButton
							onClick={() => {
								this.setState({
									isTocOpened: !this.state.isTocOpened,
								})
							}}
						>
							{this.state.isTocOpened ? (
								<FontAwesomeIcon icon={faCaretUp} />
							) : (
								<FontAwesomeIcon icon={faCaretDown} />
							)}
						</StyledTocToggleButton>
						{
							// add table of contents if it exists
							this.state.fetchedPage.toc && (
								<StyledCollapseContainer>
									<Collapse isOpened={this.state.isTocOpened}>
										<div>
											<div
												className="link-color"
												dangerouslySetInnerHTML={{
													__html: marked(
														this.state.fetchedPage
															.toc
													),
												}}
											></div>
										</div>
									</Collapse>
								</StyledCollapseContainer>
							)
						}
						<hr />
						<div
							className="link-color"
							dangerouslySetInnerHTML={{
								__html: marked(this.state.fetchedPage.content),
							}}
						></div>
					</div>
				</>
			)
		}
	}
}
