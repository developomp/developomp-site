import styled from "styled-components"
import { Link } from "react-router-dom"
import ReactTooltip from "react-tooltip"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"

import ThemeToggleButton from "./ThemeToggleButton"
import ReadProgress from "./ReadProgress"
import Sidebar from "./Sidebar"

import theming from "../styles/theming"
import NavbarData from "../data/NavbarData"

const StyledNav = styled.nav`
	/* set z index to arbitrarily high value to prevent other components from drawing over the navbar */
	z-index: 9999;
	position: fixed;
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
	box-shadow: 0 4px 10px rgb(0 0 0 / 5%);
`

const StyledContainer = styled.div`
	margin: 0 auto;
	align-items: center;
	display: flex;
	height: 4rem;

	/* account for 20px scrollbar width */
	@media only screen and (min-width: calc(${theming.size
			.screen_size2} + 20px)) {
		width: calc(${theming.size.screen_size2} - 20px);
	}

	.right {
		margin-left: auto;
	}
`

const StyledNavLinks = styled.div`
	display: flex;
	height: 100%;

	@media only screen and (max-width: ${theming.size.screen_size1}) {
		display: none;
	}
`

const StyledImg = styled.img`
	height: 2.5rem;

	display: block;
	margin: 1rem;
`

const StyledLink = styled.div`
	${theming.styles.navbarButtonStyle}
`

const SearchButton = () => {
	return (
		<>
			<div style={{ height: "100%" }}>
				<Link
					data-tip
					data-for="search"
					to={`${process.env.PUBLIC_URL}/search`}
				>
					<StyledLink>
						<FontAwesomeIcon icon={faSearch} />
					</StyledLink>
				</Link>
			</div>
			<ReactTooltip id="search" type="dark" effect="solid">
				<span>Search</span>
			</ReactTooltip>
		</>
	)
}

const Navbar = () => {
	return (
		<StyledNav>
			<StyledContainer>
				{/* icon */}

				<Link to="/">
					<StyledImg src={process.env.PUBLIC_URL + "/icon/icon_circle.svg"} />
				</Link>

				{/* nav links */}

				<StyledNavLinks>
					{NavbarData.map((item, index) => (
						<Link key={index} to={item.path}>
							<StyledLink>{item.title}</StyledLink>
						</Link>
					))}
				</StyledNavLinks>

				{/* right buttons */}

				<ThemeToggleButton />
				<SearchButton />
				<Sidebar />
			</StyledContainer>
			<ReadProgress />
		</StyledNav>
	)
}

export default Navbar
