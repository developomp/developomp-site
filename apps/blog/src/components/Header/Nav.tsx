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
			{NavbarData.map(({ path, title }, index) => {
				return path.at(0) === "/" ? (
					<Link key={index} to={path}>
						<HeaderButton>{title}</HeaderButton>
					</Link>
				) : (
					<a key={index} target="_blank" href={path}>
						<HeaderButton>{title}</HeaderButton>
					</a>
				)
			})}
		</Nav>
	)
}
