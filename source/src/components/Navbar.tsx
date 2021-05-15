import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import styled from "styled-components"
import theme from "styled-theming"
import ReactTooltip from "react-tooltip"
import NavbarData from "../data/NavbarData"
import theming from "../theming"

import { Link } from "react-router-dom"
import SearchBox from "./SearchBox"
import Sidebar from "./Sidebar"
import ThemeToggleButton from "./ThemeToggleButton"
import { faLanguage } from "@fortawesome/free-solid-svg-icons"

const StyledNav = styled.nav`
	display: flex;
	align-items: center;
	height: 2rem;
	margin: 0;
	padding: 1rem;
	background-color: ${theme("mode", {
		light: theming.light.backgroundColor0,
		dark: theming.dark.backgroundColor0,
	})};
	color: ${theme("mode", {
		light: theming.light.color0,
		dark: theming.dark.color0,
	})};
	box-shadow: 0 4px 10px rgb(0 0 0 / 5%);

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

function Navbar() {
	return (
		<StyledNav>
			<Link to="/">
				<StyledImg
					src={process.env.PUBLIC_URL + "/icon/icon_circle.svg"}
				/>
			</Link>
			<StyledNavLinks>
				{NavbarData.map((item, index) => {
					return (
						<StyledLink key={index} to={item.path}>
							{item.title}
						</StyledLink>
					)
				})}
			</StyledNavLinks>

			<ThemeToggleButton />

			<StyledALink data-tip data-for="language">
				<FontAwesomeIcon icon={faLanguage} />
			</StyledALink>
			<ReactTooltip id="language" type="dark" effect="solid">
				<span>Change to Korean/English</span>
			</ReactTooltip>

			<StyledALink
				data-tip
				data-for="github"
				href="https://github.com/developomp/developomp-site"
				target="_blank"
			>
				<FontAwesomeIcon icon={faGithub} />
			</StyledALink>
			<ReactTooltip id="github" type="dark" effect="solid">
				<span>View source code</span>
			</ReactTooltip>

			<SearchBox />
			<Sidebar />
		</StyledNav>
	)
}

export default Navbar
