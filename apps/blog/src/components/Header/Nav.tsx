import { useContext } from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

import HeaderButton from "./HeaderButton"

import NavbarData from "../../data/NavbarData"
import { globalContext } from "../../globalContext"

const Nav = styled.div`
	display: flex;
	height: 100%;

	@media only screen and (max-width: ${({ theme }) =>
			theme.theme.maxDisplayWidth.mobile}) {
		display: none;
	}
`

export default () => {
	const { globalState } = useContext(globalContext)

	return (
		<Nav>
			{NavbarData.map((item, index) => (
				<Link key={index} to={globalState.locale + item.path}>
					<HeaderButton>
						{globalState.locale == "en" ? item.title_en : item.title_kr}
					</HeaderButton>
				</Link>
			))}
		</Nav>
	)
}
