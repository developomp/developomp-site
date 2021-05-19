import { useState } from "react"
import styled, { css } from "styled-components"
import NavbarData from "../data/NavbarData"
import ReactTooltip from "react-tooltip"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsisV, faTimes } from "@fortawesome/free-solid-svg-icons"

import theming from "../theming"
import SubMenu from "./SubMenu"

interface StateProps {
	isSidebarOpen: boolean
}

const CommonSidebarToggleButtonStyle = css`
	${theming.styles.navbarButtonStyle}
	font-size: "1.5rem";
	width: 1.5rem;
	text-align: center;
	cursor: pointer;
	margin: 0.1rem;
	@media only screen and (min-width: ${theming.size.screen_size1}) {
		display: none;
	}
`

const StyledToggleSidebarButton = styled.div`
	${CommonSidebarToggleButtonStyle}
`

const StyledToggleSidebarButton2 = styled.div`
	${CommonSidebarToggleButtonStyle}
	border-radius: 0;
	margin: auto;
	width: 90%;
	height: 2rem;
	font-size: 1.1rem;
`

const StyledOverlay = styled.div<StateProps>`
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

const SidebarNav = styled.nav<StateProps>`
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
	background-color: ${(props) =>
		theming.theme(props.theme.currentTheme, {
			light: theming.light.backgroundColor0,
			dark: theming.dark.backgroundColor0,
		})};
	color: ${(props) =>
		theming.theme(props.theme.currentTheme, {
			light: theming.light.color0,
			dark: theming.dark.color0,
		})};
`

const SidebarWrap = styled.div`
	width: 100%;
`

const Sidebar = () => {
	const [isSidebarOpen, setSidebar] = useState(false)

	function toggleSidebar() {
		setSidebar(!isSidebarOpen)
		document.body.style.overflow = isSidebarOpen ? "scroll" : "hidden"
	}

	return (
		<>
			<StyledOverlay
				isSidebarOpen={isSidebarOpen}
				onClick={toggleSidebar}
			/>

			<StyledToggleSidebarButton
				data-tip
				data-for="sidebar"
				onClick={toggleSidebar}
			>
				<FontAwesomeIcon icon={faEllipsisV}></FontAwesomeIcon>
				<ReactTooltip id="sidebar" type="dark" effect="solid">
					<span>open sidebar</span>
				</ReactTooltip>
			</StyledToggleSidebarButton>

			<SidebarNav isSidebarOpen={isSidebarOpen}>
				<SidebarWrap>
					<StyledToggleSidebarButton2 onClick={toggleSidebar}>
						<FontAwesomeIcon icon={faTimes}></FontAwesomeIcon> Close
					</StyledToggleSidebarButton2>
					{NavbarData.map((item, index) => {
						return <SubMenu item={item} key={index} />
					})}
				</SidebarWrap>
			</SidebarNav>
		</>
	)
}

export default Sidebar
