import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import styled from "styled-components"
import theming from "../theming"

export default class Footer extends React.Component {
	StyledFooter = styled.footer`
		display: flex;
		justify-content: space-between;
		margin-bottom: 1px; /* footer goes outside the page by 1 px for some reason */
		padding: 50px 10px;
		background-color: white;
		background-color: ${(props) =>
			theming.theme(props.theme.currentTheme, {
				light: "white",
				dark: "black",
			})};
		color: ${(props) =>
			theming.theme(props.theme.currentTheme, {
				light: "black",
				dark: "white",
			})};
		* {
			margin: 0;
			padding: 0;
			box-sizing: border-box;
		}
		.logo {
			color: gray;
		}
	`

	StyledLink = styled.a`
		width: 30px;
		font-size: 2rem;
		color: ${(props) =>
			theming.theme(props.theme.currentTheme, {
				light: "lightgrey",
				dark: "grey",
			})};

		&:hover {
			color: ${(props) =>
				theming.theme(props.theme.currentTheme, {
					light: "black",
					dark: "white",
				})};
		}
	`

	StyledStrong = styled.strong`
		font-size: 1.1rem;
	`

	render() {
		return (
			<this.StyledFooter>
				<div className="logo">
					Copyright &copy; develo
					<this.StyledStrong>p</this.StyledStrong>omp
				</div>

				<div className="icons">
					<this.StyledLink
						href="https://github.com/developomp/developomp-site"
						target="_blank"
					>
						<FontAwesomeIcon icon={faGithub} />
					</this.StyledLink>
				</div>
			</this.StyledFooter>
		)
	}
}
