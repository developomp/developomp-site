import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import styled from "styled-components"
import ReactTooltip from "react-tooltip"
import { Link } from "react-router-dom"
import { isMobile } from "react-device-detect"

import theming from "../theming"
import NavbarData from "../data/NavbarData"

import SearchBox from "./SearchBox"
import Sidebar from "./Sidebar"
import ThemeToggleButton from "./ThemeToggleButton"

const StyledNav = styled.nav`
	position: absolute;
	width: 100%;
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
`

const StyledContainer = styled.div`
	margin: 0 auto;
	align-items: center;
	display: flex;
	height: 2rem;
	padding: 1rem;
	box-shadow: 0 4px 10px rgb(0 0 0 / 5%);

	/* 20px is for scrollbar */
	@media only screen and (min-width: calc(${theming.size
			.screen_size2} + 20px)) {
		width: calc(${theming.size.screen_size2} - 20px);
	}

	.right {
		margin-left: auto;
	}
`

const StyledNavLinks = styled.div`
	@media only screen and (max-width: ${theming.size.screen_size1}) {
		display: none;
	}
`

const StyledImg = styled.img`
	height: 2rem;
	margin: 1rem;
`

const StyledLink = styled(Link)`
	${theming.styles.navbarButtonStyle}
`

const StyledALink = styled.a`
	${theming.styles.navbarButtonStyle}
`

export default class Navbar extends React.Component {
	render() {
		return (
			<StyledNav>
				<StyledContainer>
					<Link to="/">
						<StyledImg
							src={
								process.env.PUBLIC_URL + "/icon/icon_circle.svg"
							}
						/>
					</Link>
					<StyledNavLinks>
						{NavbarData.map((item, index) => (
							<StyledLink key={index} to={item.path}>
								{item.title}
							</StyledLink>
						))}
					</StyledNavLinks>

					<ThemeToggleButton />

					<StyledALink
						data-tip
						data-for="github"
						href="https://github.com/developomp/developomp-site"
						target="_blank"
					>
						<FontAwesomeIcon icon={faGithub} />
					</StyledALink>
					{!isMobile && (
						<ReactTooltip id="github" type="dark" effect="solid">
							<span>View source code</span>
						</ReactTooltip>
					)}

					<SearchBox />
					<Sidebar />
				</StyledContainer>
			</StyledNav>
		)
	}
}
