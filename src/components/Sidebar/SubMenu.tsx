/**
 * @file Submenu item for sidebar
 */

import { useCallback, useContext, useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

import theming from "../../styles/theming"
import { globalContext } from "../../globalContext"

import type { Item } from "../../data/NavbarData"

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

	&:hover {
		color: inherit;
	}
`

const SidebarLabel = styled.span`
	margin-left: 1rem;
`

interface Props {
	item: Item
}

const SubMenu = (props: Props) => {
	const { globalState } = useContext(globalContext)
	const [isSubNavOpen, setSubNavOpen] = useState(false)
	const handleSidebarLinkClick = useCallback(() => {
		setSubNavOpen((prev) => !prev)
	}, [isSubNavOpen])

	return (
		<>
			<SidebarLink to={props.item.path} onClick={handleSidebarLinkClick}>
				<div>
					{props.item.icon}
					<SidebarLabel>
						{globalState.locale == "en"
							? props.item.title_en
							: props.item.title_kr}
					</SidebarLabel>
				</div>
			</SidebarLink>
		</>
	)
}

export default SubMenu
