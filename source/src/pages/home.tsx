import { Link } from "react-router-dom"
import styled from "styled-components"
import theme from "styled-theming"
import marked from "marked"
import Helmet from "react-helmet"

import pages from "../pages.json"

const StyledPostList = styled.div`
	padding-top: 2rem;
	margin: auto;
	text-align: center;
	color: ${theme("mode", {
		light: "#111111",
		dark: "#EEEEEE",
	})};
`

const StyledH1 = styled.h1`
	margin-bottom: 20px;
	font-weight: 500;
	margin: 0;
`

const StyledTitle = styled.h1`
	font-size: 2rem;
	font-style: bold;
`

const StyledLink = styled(Link)`
	text-decoration: none;

	color: ${theme("mode", {
		light: "black",
		dark: "white",
	})};

	&:hover {
		text-decoration: underline;
	}
`

const StyledPostCard = styled.div`
	box-shadow: 0 4px 10px rgb(0 0 0 / 10%);
	text-align: left;
	margin-bottom: 20px;
	padding: 10px 20px;
`

function Home(props) {
	let PostCards: Array<any> = []
	let howMany = props.howMany
	let isLimited = Boolean(howMany)

	let h1Text = "All posts"
	if (isLimited) {
		h1Text = `${howMany} recent posts`
	}

	for (const pagePath in pages) {
		if (isLimited && howMany <= 0) continue

		let post = pages[pagePath]
		post.title = post.meta?.title ? post.meta.title : "Unknown title"
		post.date = post.meta?.date ? post.meta.date : "Unknown date"
		post.author = post.meta?.author ? post.meta.author : "Unknown author"

		PostCards.push(
			<StyledPostCard key={pagePath} className="card main-content">
				<StyledTitle>
					<StyledLink to={pagePath}>{post.title}</StyledLink>
				</StyledTitle>
				<small>
					Published on {post.date} by {post.author}
				</small>
				<hr />
				<div
					className="link-color"
					dangerouslySetInnerHTML={{
						__html: marked(
							post.content.split(" ").slice(0, 20).join(" ") +
								"..."
						),
					}}
				></div>
				<small>
					<StyledLink to={pagePath}>Read more</StyledLink>
				</small>
			</StyledPostCard>
		)
		howMany--
	}

	return (
		<>
			<Helmet>
				<title>pomp | {props.title}</title>

				<meta property="og:title" content={props.title} />
				<meta property="og:type" content="website" />
				<meta property="og:url" content="http://developomp.com" />
				<meta
					property="og:image"
					content="http://developomp.com/icon/icon.svg"
				/>
				<meta property="og:description" content="" />
			</Helmet>

			<StyledPostList>
				<StyledH1>{h1Text}</StyledH1>
				<br />
				{PostCards}
			</StyledPostList>
		</>
	)
}

export default Home
