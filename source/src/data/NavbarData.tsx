import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	faAddressBook,
	faHome,
	faIdCard,
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
		title: "Portfolio",
		path: "/portfolio",
		icon: <FontAwesomeIcon icon={faAddressBook} />,
	},
]

export default NavbarData
