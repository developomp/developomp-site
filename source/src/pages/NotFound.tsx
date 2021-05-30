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

const Styled404 = styled.h1`
	font-size: 3rem;
`

export default class NotFound extends React.Component {
	render() {
		return (
			<>
				<Helmet>
					<title>pomp | 404</title>

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
				<StyledNotFound className="card main-content">
					<Styled404>404</Styled404>
					the page you are looking for does not exist. :(
				</StyledNotFound>
			</>
		)
	}
}
