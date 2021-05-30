import React from "react"
import styled, { css } from "styled-components"
import ReactTooltip from "react-tooltip"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsisV, faTimes } from "@fortawesome/free-solid-svg-icons"

import theming from "../theming"
import NavbarData, { Item } from "../data/NavbarData"

import SubMenu from "./SubMenu"

const CommonSidebarToggleButtonStyle = css`
	${theming.styles.navbarButtonStyle}
	width: 1.5rem;
	text-align: center;
	cursor: pointer;
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

const StyledOverlay = styled.div<SidebarState>`
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

const SidebarNav = styled.nav<SidebarState>`
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

interface SidebarProps {}
interface SidebarState {
	isSidebarOpen: boolean
}

export default class Sidebar extends React.Component<
	SidebarProps,
	SidebarState
> {
	constructor(props) {
		super(props)
		this.state = {
			isSidebarOpen: false,
		}
	}

	// for some reason this.setState only works if this is an arrow function
	toggleSidebar = () => {
		this.setState({ isSidebarOpen: !this.state.isSidebarOpen })
		document.body.style.overflow = this.state.isSidebarOpen ? "" : "hidden"
	}

	render() {
		return (
			<>
				<StyledOverlay
					isSidebarOpen={this.state.isSidebarOpen}
					onClick={this.toggleSidebar}
				/>

				<StyledToggleSidebarButton
					data-tip
					data-for="sidebar"
					onClick={this.toggleSidebar}
				>
					<FontAwesomeIcon icon={faEllipsisV}></FontAwesomeIcon>
					<ReactTooltip id="sidebar" type="dark" effect="solid">
						<span>open sidebar</span>
					</ReactTooltip>
				</StyledToggleSidebarButton>

				<SidebarNav isSidebarOpen={this.state.isSidebarOpen}>
					<SidebarWrap>
						<StyledToggleSidebarButton2
							onClick={this.toggleSidebar}
						>
							<FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>{" "}
							Close
						</StyledToggleSidebarButton2>
						{NavbarData.map((item: Item, index) => {
							return <SubMenu item={item} key={index} />
						})}
					</SidebarWrap>
				</SidebarNav>
			</>
		)
	}
}
