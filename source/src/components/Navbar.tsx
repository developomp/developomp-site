import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import styled from "styled-components"
import ReactTooltip from "react-tooltip"
import { Link } from "react-router-dom"

import theming from "../theming"
import NavbarData from "../data/NavbarData"

import SearchBox from "./SearchBox"
import Sidebar from "./Sidebar"
import ThemeToggleButton from "./ThemeToggleButton"
import LanguageToggleButton from "./LanguageToggleButton"

export default class Navbar extends React.Component {
	StyledNav = styled.nav`
		display: flex;
		align-items: center;
		height: 2rem;
		margin: 0;
		padding: 1rem;
		background-color: ${(props) =>
			theming.theme(props.theme.currentTheme, {
				light: theming.light.backgroundColor0,
				dark: theming.dark.backgroundColor0,
			})};
		color: ${(props) =>
			theming.theme(props.theme.currentTheme, {
				light: theming.light.color0,
				dark: theming.dark.color0,
			})};
		box-shadow: 0 4px 10px rgb(0 0 0 / 5%);

		.right {
			margin-left: auto;
		}
	`

	StyledNavLinks = styled.div`
		@media only screen and (max-width: ${theming.size.screen_size1}) {
			display: none;
		}
	`

	StyledImg = styled.img`
		height: 2rem;
		margin: 1rem;
	`

	StyledLink = styled(Link)`
		${theming.styles.navbarButtonStyle}
	`

	StyledALink = styled.a`
		${theming.styles.navbarButtonStyle}
	`
	render() {
		return (
			<this.StyledNav>
				<Link to="/">
					<this.StyledImg
						src={process.env.PUBLIC_URL + "/icon/icon_circle.svg"}
					/>
				</Link>
				<this.StyledNavLinks>
					{NavbarData.map((item, index) => (
						<this.StyledLink key={index} to={item.path}>
							{item.title}
						</this.StyledLink>
					))}
				</this.StyledNavLinks>

				<ThemeToggleButton />
				<LanguageToggleButton />

				<this.StyledALink
					data-tip
					data-for="github"
					href="https://github.com/developomp/developomp-site"
					target="_blank"
				>
					<FontAwesomeIcon icon={faGithub} />
				</this.StyledALink>
				<ReactTooltip id="github" type="dark" effect="solid">
					<span>View source code</span>
				</ReactTooltip>

				<SearchBox />
				<Sidebar />
			</this.StyledNav>
		)
	}
}
