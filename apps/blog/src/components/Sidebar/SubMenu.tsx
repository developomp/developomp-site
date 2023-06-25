/**
 * @file Submenu item for sidebar
 */

import type { Item } from "../../data/NavbarData"

import { useCallback, useState } from "react"
import { Link } from "react-router-dom"
import styled, { css } from "styled-components"

import button from "../../styles/button"

const sharedStyle = css`
	${button};
	display: flex;
	width: 100%;
	margin: 0;
	border-radius: 0;
	justify-content: space-between;
	height: 2rem;
	align-items: center;
	padding: 20px;
	list-style: none;

	svg {
		scale: 1.5;
	}

	&:hover {
		color: inherit;
	}
`

const SidebarLink = styled(Link)`
	${sharedStyle}
`

const SidebarAnchor = styled.a`
	${sharedStyle}
`

const SidebarLabel = styled.span`
	margin-left: 1rem;
`

interface Props {
	item: Item
}

const SubMenu = ({ item }: Props) => {
	const { path, icon, title } = item
	const [isSubNavOpen, setSubNavOpen] = useState(false)
	const handleSidebarLinkClick = useCallback(() => {
		setSubNavOpen((prev) => !prev)
	}, [isSubNavOpen])

	if (path.at(0) == "/") {
		return (
			<SidebarLink to={path} onClick={handleSidebarLinkClick}>
				<div>
					{icon}
					<SidebarLabel>{title}</SidebarLabel>
				</div>
			</SidebarLink>
		)
	}

	return (
		<SidebarAnchor target="_blank" href={path} onClick={handleSidebarLinkClick}>
			<div>
				{icon}
				<SidebarLabel>{title}</SidebarLabel>
			</div>
		</SidebarAnchor>
	)
}

export default SubMenu
