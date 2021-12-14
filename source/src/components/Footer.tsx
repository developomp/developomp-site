import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import styled from "styled-components"

import theming from "../theming"

const StyledFooter = styled.footer`
	display: flex;
	height: 7.77rem; /* congratulation. You've found the lucky 777 */

	align-items: center;
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
	padding: 0 1rem 0 1rem;
	justify-content: space-between;

	text-align: center;
	color: gray;

	width: 100%;
	max-width: ${theming.size.screen_size2};
`

const StyledGithubLink = styled.a`
	font-size: 2.5rem;

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

const Footer = () => {
	return (
		<StyledFooter>
			<StyledFooterContainer>
				<div>
					Created by <b>developomp</b>
				</div>

				<StyledGithubLink
					href="https://github.com/developomp/developomp-site"
					target="_blank"
				>
					<FontAwesomeIcon icon={faGithub} />
				</StyledGithubLink>
			</StyledFooterContainer>
		</StyledFooter>
	)
}

export default Footer
