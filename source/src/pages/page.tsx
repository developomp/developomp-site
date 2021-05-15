import marked from "marked"
import NotFound from "./notfound"
import { Helmet } from "react-helmet-async"

import pages from "../pages.json"
import { useParams } from "react-router-dom"

function Page() {
	const path = `/${useParams().path}`
	const fetched = pages[path]
	if (!fetched) return <NotFound />

	// to prevent wrapping. I don't want to touch prettier stuff
	const idk = "Unknown"
	fetched.content = fetched?.content ? fetched.content : "No content"
	fetched.toc = fetched.meta?.toc ? fetched.meta.toc : undefined
	fetched.title = fetched.meta?.title ? fetched.meta.title : "No title"
	fetched.date = fetched.meta?.date ? fetched.meta.date : `${idk} date`
	fetched.author = fetched.meta?.author
		? fetched.meta.author
		: `${idk} author`

	const TableOfContents = fetched.toc && (
		<>
			<div className="card">
				<strong>Table of Content:</strong>
				<div
					className="link-color"
					dangerouslySetInnerHTML={{
						__html: marked(fetched.toc),
					}}
				></div>
			</div>
			<hr />
		</>
	) // add toc if it exists

	return (
		<>
			<Helmet>
				<title>pomp | {fetched.title}</title>

				<meta property="og:title" content="Page Not Found" />
				<meta property="og:type" content="website" />
				<meta property="og:url" content="http://developomp.com" />
				<meta
					property="og:image"
					content="http://developomp.com/icon/icon.svg"
				/>
				<meta property="og:description" content="Page does not exist" />
			</Helmet>

			<div className="card main-content">
				<h2>{fetched.title}</h2>
				<small>
					Published on {fetched.date} by {fetched.author}
				</small>
				<hr />
				{TableOfContents}
				<div
					className="link-color"
					dangerouslySetInnerHTML={{
						__html: marked(fetched.content),
					}}
				></div>
			</div>
		</>
	)
}

export default Page
