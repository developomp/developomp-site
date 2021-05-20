import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import theming from "../theming"
import { Item } from "../data/NavbarData"

interface SubMenuProps {
	item: Item
}

interface SubMenuState {
	isSubNavOpen: boolean
}

export default class SubMenu extends React.Component<
	SubMenuProps,
	SubMenuState
> {
	SidebarLink = styled(Link)`
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

	SidebarLabel = styled.span`
		margin-left: 16px;
	`

	DropdownLink = styled(Link)`
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

	constructor(props) {
		super(props)
		this.state = {
			isSubNavOpen: false,
		}
	}

	showSubNav = () => this.setState({ isSubNavOpen: !this.state.isSubNavOpen })

	render() {
		return (
			<>
				<this.SidebarLink
					to={this.props.item.path}
					onClick={this.props.item.subNav && this.showSubNav}
				>
					<div>
						{this.props.item.icon}
						<this.SidebarLabel>
							{this.props.item.title}
						</this.SidebarLabel>
					</div>
					<div>
						{this.props.item.subNav && this.state.isSubNavOpen
							? this.props.item.iconOpened
							: this.props.item.subNav
							? this.props.item.iconClosed
							: null}
					</div>
				</this.SidebarLink>

				{/* not used as of the moment */}
				{this.state.isSubNavOpen && // check if subNav is open
					this.props.item.subNav && // check if subNav exists in that item
					this.props.item.subNav.map((item, index) => {
						// shows all items in subNav
						return (
							<this.DropdownLink to={item.path} key={index}>
								{item.icon}
								<this.SidebarLabel>
									{item.title}
								</this.SidebarLabel>
							</this.DropdownLink>
						)
					})}
			</>
		)
	}
}
