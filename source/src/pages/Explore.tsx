import React from "react"
import styled from "styled-components"
import { Helmet } from "react-helmet-async"

import theming from "../theming"

const StyledNotFound = styled.div`
	margin: auto;
	margin-top: 2rem;
	text-align: center;
	color: ${(props) =>
		theming.theme(props.theme.currentTheme, {
			light: "#111111",
			dark: "#EEEEEE",
		})};
`

export default class Explore extends React.Component {
	render() {
		return (
			<>
				<Helmet>
					<title>pomp | Explore</title>

					<meta property="og:title" content="Explore" />
					<meta property="og:type" content="website" />
					<meta
						property="og:url"
						content={`${process.env.PUBLIC_URL}`}
					/>
					<meta
						property="og:image"
						content={`${process.env.PUBLIC_URL}/icon/icon.svg`}
					/>
					<meta
						property="og:description"
						content="search and explore"
					/>
				</Helmet>
				<StyledNotFound className="card main-content">
					Explore!!
				</StyledNotFound>
			</>
		)
	}
}
