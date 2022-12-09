import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	faHome,
	faFileLines,
	faUser,
	faUserTie,
} from "@fortawesome/free-solid-svg-icons"

// item from sidebar data
export type Item = {
	path: string
	icon: JSX.Element
	title_en: string
	title_kr: string
}

const NavbarData: Item[] = [
	{
		title_en: "Home",
		title_kr: "홈",
		path: "/",
		icon: <FontAwesomeIcon icon={faHome} />,
	},
	{
		title_en: "About",
		title_kr: "소개",
		path: "/about",
		icon: <FontAwesomeIcon icon={faUser} />,
	},
	{
		title_en: "Portfolio",
		title_kr: "포트폴리오",
		path: "/portfolio",
		icon: <FontAwesomeIcon icon={faFileLines} />,
	},
	{
		title_en: "Resume",
		title_kr: "이력서",
		path: "/resume",
		icon: <FontAwesomeIcon icon={faUserTie} />,
	},
]

export default NavbarData
