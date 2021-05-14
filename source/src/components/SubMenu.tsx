import { useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import theming from "../theming"

const SidebarLink = styled(Link)`
	${theming.styles.navbarButtonStyle};
	display: flex;
	width: 100%;
	margin: 0;
	border-radius: 0;
	justify-content: space-between;
	height: 2rem;
	align-items: center;
	padding: 20px;
	list-style: none;
`

const SidebarLabel = styled.span`
	margin-left: 16px;
`

const DropdownLink = styled(Link)`
	background: #414757;
	height: 60px;
	padding-left: 3rem;
	display: flex;
	align-items: center;
	text-decoration: none;
	color: #f5f5f5;
	font-size: 18px;

	&:hover {
		background: #632ce4;
		cursor: pointer;
	}
`

function SubMenu({ item }) {
	const [isSubNavOpen, setSubNav] = useState(false)

	const showSubNav = () => setSubNav(!isSubNavOpen)

	return (
		<>
			<SidebarLink to={item.path} onClick={item.subNav && showSubNav}>
				<div>
					{item.icon}
					<SidebarLabel>{item.title}</SidebarLabel>
				</div>
				<div>
					{item.subNav && isSubNavOpen
						? item.iconOpened
						: item.subNav
						? item.iconClosed
						: null}
				</div>
			</SidebarLink>

			{/* not used as of the moment */}
			{isSubNavOpen &&
				item.subNav.map((item, index) => {
					return (
						<DropdownLink to={item.path} key={index}>
							{item.icon}
							<SidebarLabel>{item.title}</SidebarLabel>
						</DropdownLink>
					)
				})}
		</>
	)
}

export default SubMenu
