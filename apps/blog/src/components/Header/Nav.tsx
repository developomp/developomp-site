import styled from "styled-components"
import { Link } from "react-router-dom"

import HeaderButton from "./HeaderButton"

import NavbarData from "../../data/NavbarData"

const Nav = styled.div`
	display: flex;
	height: 100%;

	@media only screen and (max-width: ${({ theme }) =>
			theme.theme.maxDisplayWidth.mobile}) {
		display: none;
	}
`

export default () => {
	return (
		<Nav>
			{NavbarData.map((item, index) => (
				<Link key={index} to={item.path}>
					<HeaderButton>{item.title}</HeaderButton>
				</Link>
			))}
		</Nav>
	)
}
