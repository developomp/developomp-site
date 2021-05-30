import React from "react"
import styled from "styled-components"
import { Helmet } from "react-helmet-async"

export default class Portfolio extends React.Component {
	StyledPortfolio = styled.div``

	StyledH1 = styled.h1`
		font-size: 3rem;
	`

	render() {
		return (
			<>
				<Helmet>
					<title>pomp | Portfolio</title>

					<meta
						property="og:title"
						content="developomp's Portfolio"
					/>
					<meta property="og:type" content="website" />
					<meta property="og:url" content="http://developomp.com" />
					<meta
						property="og:image"
						content="http://developomp.com/icon/icon.svg"
					/>
					<meta
						property="og:description"
						content="developomp's Portfolio"
					/>
				</Helmet>
				<this.StyledPortfolio className="card main-content">
					<this.StyledH1>Portfolio</this.StyledH1>
					My projects
				</this.StyledPortfolio>
			</>
		)
	}
}
