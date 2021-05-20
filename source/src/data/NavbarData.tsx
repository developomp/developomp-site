import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	faHome,
	faArchive,
	faUserTie,
	faHashtag,
	faListUl,
	faHiking,
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
		title: "Explore",
		path: "/explore",
		icon: <FontAwesomeIcon icon={faHiking} />,
	},
	{
		title: "Categories",
		path: "/categories",
		icon: <FontAwesomeIcon icon={faListUl} />,
	},
	{
		title: "Tags",
		path: "/tags",
		icon: <FontAwesomeIcon icon={faHashtag} />,
	},
	{
		title: "Archives",
		path: "/archives",
		icon: <FontAwesomeIcon icon={faArchive} />,
	},
	{
		title: "Portfolio",
		path: "/portfolio",
		icon: <FontAwesomeIcon icon={faUserTie} />,
	},
]

export default NavbarData
