/**
 * @file Submenu item for sidebar
 */

import { useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

import { Item } from "../data/NavbarData"
import theming from "../styles/theming"

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

interface Props {
	item: Item
}

const SubMenu = (props: Props) => {
	const [isSubNavOpen, setSubNavOpen] = useState(false)

	const handleSidebarLinkClick = () => {
		if (props.item.subNav) setSubNavOpen((prev) => !prev)
	}

	return (
		<>
			<SidebarLink to={props.item.path} onClick={handleSidebarLinkClick}>
				<div>
					{props.item.icon}
					<SidebarLabel>{props.item.title}</SidebarLabel>
				</div>
				<div>
					{props.item.subNav && isSubNavOpen
						? props.item.iconOpened
						: props.item.subNav
						? props.item.iconClosed
						: undefined}
				</div>
			</SidebarLink>

			{/* not used as of the moment */}
			{isSubNavOpen && // check if subNav is open
				props.item.subNav && // check if subNav exists in that item
				props.item.subNav.map((item, index) => {
					// shows all items in subNav
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
