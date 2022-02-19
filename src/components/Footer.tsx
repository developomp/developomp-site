import styled from "styled-components"

import theming from "../styles/theming"
import GithubLinkIcon from "./GithubLinkIcon"

const StyledFooter = styled.footer`
	display: flex;

	// congratulation. You've found the lucky 7s
	min-height: 7.77rem;
	max-height: 7.77rem;

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

const Footer = () => {
	return (
		<StyledFooter>
			<StyledFooterContainer>
				<div>
					Created by <b>developomp</b>
				</div>

				<GithubLinkIcon link="https://github.com/developomp/developomp-site" />
			</StyledFooterContainer>
		</StyledFooter>
	)
}

export default Footer
