import React from "react"
import marked from "marked"
import { Helmet } from "react-helmet-async"

import posts from "../data/posts.json"

import NotFound from "./NotFound"
import Spinner from "../components/Spinner"

interface PageProps {}

interface PageState {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	fetchedPage: any
	loading: boolean
}

export default class Page extends React.Component<PageProps, PageState> {
	constructor(props) {
		super(props)
		this.state = {
			fetchedPage: undefined,
			loading: true,
		}
	}

	async componentDidMount() {
		const url = location.pathname.replace(/\/$/, "")
		const fetchedPage = posts.posts[url] // remove a trailing slash

		if (!fetchedPage) {
			this.setState({
				loading: false,
			})
			return
		}

		const fetched_content = (await import(`../data/posts${url}.json`))
			.content
		fetchedPage.content = fetched_content ? fetched_content : "No content"
		fetchedPage.toc = fetchedPage?.toc ? fetchedPage.toc : undefined
		fetchedPage.title = fetchedPage?.title ? fetchedPage.title : "No title"
		fetchedPage.date = fetchedPage?.date ? fetchedPage.date : "Unknown date"

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
						<h1>{this.state.fetchedPage.title}</h1>
						<small>
							Published on {this.state.fetchedPage.date} by
							developomp
						</small>
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
