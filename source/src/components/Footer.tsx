import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import styled from "styled-components"
import theming from "../theming"

const StyledFooter = styled.footer`
	display: flex;
	justify-content: center;

	color: ${(props) =>
		theming.theme(props.theme.currentTheme, {
			light: "black",
			dark: "white",
		})};

	background-color: ${(props) =>
		theming.theme(props.theme.currentTheme, {
			light: "white",
			dark: "black",
		})};
`

const StyledFooterContainer = styled.div`
	display: flex;
	justify-content: space-between;

	margin-bottom: 1px; /* a hacky solution for footer going outside the page by 1px */
	padding: 0 1rem 0 1rem;

	height: 100px;
	width: 100%;
	line-height: 100px;
	text-align: center;

	max-width: ${theming.size.screen_size2};

	.logo {
		color: gray;
	}
`

const StyledALink = styled.a`
	font-size: 2rem;

	color: ${(props) =>
		theming.theme(props.theme.currentTheme, {
			light: "lightgrey",
			dark: "grey",
		})};

	&:hover {
		color: ${(props) =>
			theming.theme(props.theme.currentTheme, {
				light: theming.light.color0,
				dark: theming.dark.color0,
			})};
	}
`

export default class Footer extends React.Component {
	render() {
		return (
			<StyledFooter>
				<StyledFooterContainer>
					<div className="logo">Copyright &copy; developomp</div>

					<StyledALink
						href="https://github.com/developomp/developomp-site"
						target="_blank"
					>
						<FontAwesomeIcon icon={faGithub} />
					</StyledALink>
				</StyledFooterContainer>
			</StyledFooter>
		)
	}
}
