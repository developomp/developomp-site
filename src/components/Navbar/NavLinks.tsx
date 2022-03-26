import styled from "styled-components"
import { Link } from "react-router-dom"

import NavbarData from "../../data/NavbarData"
import theming from "../../styles/theming"

import { StyledLink } from "./Navbar"

const StyledNavLinks = styled.div`
	display: flex;
	height: 100%;

	@media only screen and (max-width: ${theming.size.screen_size1}) {
		display: none;
	}
`

const NavLinks = () => {
	return (
		<StyledNavLinks>
			{NavbarData.map((item, index) => (
				<Link key={index} to={item.path}>
					<StyledLink>{item.title}</StyledLink>
				</Link>
			))}
		</StyledNavLinks>
	)
}

export default NavLinks
