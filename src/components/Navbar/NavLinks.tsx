import { useContext } from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

import { StyledLink } from "./Navbar"

import NavbarData from "../../data/NavbarData"
import theming from "../../styles/theming"
import { globalContext } from "../../globalContext"

const StyledNavLinks = styled.div`
	display: flex;
	height: 100%;

	@media only screen and (max-width: ${theming.size.screen_size1}) {
		display: none;
	}
`

const NavLinks = () => {
	const { globalState } = useContext(globalContext)

	return (
		<StyledNavLinks>
			{NavbarData.map((item, index) => (
				<Link key={index} to={globalState.locale + item.path}>
					<StyledLink>
						{globalState.locale == "en" ? item.title_en : item.title_kr}
					</StyledLink>
				</Link>
			))}
		</StyledNavLinks>
	)
}

export default NavLinks
