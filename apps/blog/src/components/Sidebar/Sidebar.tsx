import { useCallback, useState } from "react"
import styled from "styled-components"
import ReactTooltip from "react-tooltip"
import { isMobile } from "react-device-detect"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsisV, faTimes } from "@fortawesome/free-solid-svg-icons"

import SubMenu from "./SubMenu"

import NavbarData from "../../data/NavbarData"
import { HeaderButtonCSS } from "../Header/HeaderButton"

const SidebarOpenButton = styled.div`
	${HeaderButtonCSS}

	@media only screen and (min-width: ${({ theme }) =>
		theme.theme.maxDisplayWidth.mobile}) {
		display: none;
	}
`

const SidebarCloseButton = styled.div`
	${HeaderButtonCSS}
	height: 4rem;
	font-size: 1.1rem;

	svg {
		margin-top: 0.2rem;
		margin-right: 0.5rem;
	}
`

const StyledOverlay = styled.div<{ isSidebarOpen: boolean }>`
	display: ${(props) => (props.isSidebarOpen ? "block" : "none")};
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 20;
	transition-property: opacity;
	background-color: rgba(0, 0, 0, 25%);

	* {
		overflow: scroll;
	}
`

const SidebarNav = styled.nav<{ isSidebarOpen: boolean }>`
	width: 250px;
	height: 100vh;
	display: flex;
	justify-content: center;
	position: fixed;
	top: 0;
	right: ${(props) => (props.isSidebarOpen ? "0" : "-100%")};
	transition: 350ms;
	z-index: 30;
	overflow-x: hidden;
	overflow-y: scroll;
	background-color: ${({ theme }) =>
		theme.theme.component.header.color.background};
	color: ${({ theme }) => theme.theme.component.header.color.text};
`

const SidebarWrap = styled.div`
	width: 100%;
`

const Sidebar = () => {
	const [isSidebarOpen, setSidebarOpen] = useState(false)
	const toggleSidebar = useCallback(() => {
		setSidebarOpen((prev) => !prev)
		document.body.style.overflow = isSidebarOpen ? "" : "hidden"
	}, [isSidebarOpen])

	return (
		<>
			<StyledOverlay isSidebarOpen={isSidebarOpen} onClick={toggleSidebar} />

			<SidebarOpenButton data-tip data-for="sidebar" onClick={toggleSidebar}>
				<FontAwesomeIcon icon={faEllipsisV}></FontAwesomeIcon>
				{!isMobile && (
					<ReactTooltip id="sidebar" type="dark" effect="solid">
						<span>open sidebar</span>
					</ReactTooltip>
				)}
			</SidebarOpenButton>

			<SidebarNav isSidebarOpen={isSidebarOpen}>
				<SidebarWrap>
					{/* close sidebar button */}

					<SidebarCloseButton onClick={toggleSidebar}>
						<FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>Close
					</SidebarCloseButton>

					{/* sidebar items */}

					{NavbarData.map((item, index) => {
						return <SubMenu item={item} key={index} />
					})}
				</SidebarWrap>
			</SidebarNav>
		</>
	)
}

export default Sidebar
