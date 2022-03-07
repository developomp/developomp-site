/**
 * @file Submenu item for sidebar
 */

import { useCallback, useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

import { Item } from "../../data/NavbarData"
import theming from "../../styles/theming"

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
	margin-left: 1rem;
`

interface Props {
	item: Item
}

const SubMenu = (props: Props) => {
	const [isSubNavOpen, setSubNavOpen] = useState(false)
	const handleSidebarLinkClick = useCallback(() => {
		setSubNavOpen((prev) => !prev)
	}, [isSubNavOpen])

	return (
		<>
			<SidebarLink to={props.item.path} onClick={handleSidebarLinkClick}>
				<div>
					{props.item.icon}
					<SidebarLabel>{props.item.title}</SidebarLabel>
				</div>
			</SidebarLink>
		</>
	)
}

export default SubMenu
