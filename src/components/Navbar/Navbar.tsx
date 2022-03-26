import styled from "styled-components"
import { Link } from "react-router-dom"

import NavLinks from "./NavLinks"
import ThemeToggleButton from "./ThemeToggleButton"
import SearchButton from "./SearchButton"
import ReadProgress from "./ReadProgress"
import Sidebar from "../Sidebar"

import theming from "../../styles/theming"

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
`

const RightButtons = styled.div`
	display: flex;
	height: 100%;
	margin-left: auto;
`

const StyledImg = styled.img`
	height: 2.5rem;

	display: block;
	margin: 1rem;
`

export const StyledLink = styled.div`
	${theming.styles.navbarButtonStyle}
`

const Navbar = () => {
	return (
		<StyledNav>
			<StyledContainer>
				{/* icon */}
				<Link to="/">
					<StyledImg src={process.env.PUBLIC_URL + "/icon/icon_circle.svg"} />
				</Link>

				{/* nav links */}
				<NavLinks />

				{/* right buttons */}
				<RightButtons>
					<ThemeToggleButton />
					<SearchButton />
				</RightButtons>

				{/* etc */}
				<Sidebar />
			</StyledContainer>
			<ReadProgress />
		</StyledNav>
	)
}

export default Navbar
