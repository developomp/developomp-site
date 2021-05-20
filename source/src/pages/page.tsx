import React from "react"
import marked from "marked"
import NotFound from "./notfound"
import { Helmet } from "react-helmet-async"

import pages from "../pages.json"

export default class Page extends React.Component {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	fetched: any

	constructor(props) {
		super(props)

		const fetched = pages[props.location.pathname]
		if (!fetched) return

		fetched.content = fetched?.content ? fetched.content : "No content"
		fetched.toc = fetched.meta?.toc ? fetched.meta.toc : undefined
		fetched.title = fetched.meta?.title ? fetched.meta.title : "No title"
		fetched.date = fetched.meta?.date ? fetched.meta.date : "Unknown date"
		fetched.author = fetched.meta?.author
			? fetched.meta.author
			: "Unknown author"

		this.fetched = fetched
	}

	render() {
		if (!this.fetched) return <NotFound />

		return (
			<>
				<Helmet>
					<title>pomp | {this.fetched.title}</title>

					<meta property="og:title" content="Page Not Found" />
					<meta property="og:type" content="website" />
					<meta property="og:url" content="http://developomp.com" />
					<meta
						property="og:image"
						content="http://developomp.com/icon/icon.svg"
					/>
					<meta
						property="og:description"
						content="Page does not exist"
					/>
				</Helmet>

				<div className="card main-content">
					<h2>{this.fetched.title}</h2>
					<small>
						Published on {this.fetched.date} by{" "}
						{this.fetched.author}
					</small>
					<hr />
					{
						this.fetched.toc && (
							<>
								<div className="card">
									<strong>Table of Content:</strong>
									<div
										className="link-color"
										dangerouslySetInnerHTML={{
											__html: marked(this.fetched.toc),
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
							__html: marked(this.fetched.content),
						}}
					></div>
				</div>
			</>
		)
	}
}
