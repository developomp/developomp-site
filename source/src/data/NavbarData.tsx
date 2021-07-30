import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	faComments,
	faHome,
	faIdCard,
	faUserTie,
} from "@fortawesome/free-solid-svg-icons"

// item from sidebar data
export type Item = {
	path: string
	subNav?: Array<Item>
	icon: JSX.Element
	title: string
	iconOpened?: JSX.Element
	iconClosed?: JSX.Element
}

const NavbarData: Array<Item> = [
	{
		title: "Home",
		path: "/",
		icon: <FontAwesomeIcon icon={faHome} />,
	},
	{
		title: "About",
		path: "/about",
		icon: <FontAwesomeIcon icon={faIdCard} />,
	},
	{
		title: "Contact",
		path: "/contact",
		icon: <FontAwesomeIcon icon={faComments} />,
	},
	{
		title: "Portfolio",
		path: "/portfolio",
		icon: <FontAwesomeIcon icon={faUserTie} />,
	},
]

export default NavbarData
