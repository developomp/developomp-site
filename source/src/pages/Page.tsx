import React from "react"
import marked from "marked"
import { Helmet } from "react-helmet-async"
import styled from "styled-components"

import posts from "../data/map.json"

import Tag from "../components/Tag"
import NotFound from "./NotFound"
import Spinner from "../components/Spinner"

const StyledTitle = styled.h1`
	margin-bottom: 1rem;
`

interface PageProps {}

interface PageState {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	fetchedPage: any
	isUnsearchable: boolean
	loading: boolean
}

export default class Page extends React.Component<PageProps, PageState> {
	constructor(props) {
		super(props)
		this.state = {
			isUnsearchable: false,
			fetchedPage: undefined,
			loading: true,
		}
	}

	async componentDidMount() {
		const url = location.pathname.replace(/\/$/, "") // remove trailing slash
		let _isUnsearchable = false

		// fetch page
		let fetchedPage = url.startsWith("/posts")
			? posts.posts[url]
			: posts.series[url]
		if (!fetchedPage) {
			fetchedPage = posts.unsearchable[url]
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

					<div className="card main-content">
						<StyledTitle>
							{this.state.fetchedPage.title}
						</StyledTitle>
						{/* Post tags */}
						<small>
							<table>
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
							</table>
							{this.state.isUnsearchable ? (
								<></>
							) : (
								<>Published on {this.state.fetchedPage.date}</>
							)}
						</small>

						{/* Horizontal Separator */}
						<hr />
						{
							this.state.fetchedPage.toc && (
								<>
									<div className="card">
										<strong>Table of Content:</strong>
										<div
											className="link-color"
											dangerouslySetInnerHTML={{
												__html: marked(
													this.state.fetchedPage.toc
												),
											}}
										></div>
									</div>
									<hr />
								</>
							) // add toc if it exists
						}
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
