import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	faHome,
	faArchive,
	faUserTie,
	faHashtag,
	faListUl,
	faHiking,
} from "@fortawesome/free-solid-svg-icons"

export default [
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
