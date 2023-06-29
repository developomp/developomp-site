import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faFileLines,
    faUser,
    faUserTie,
} from "@fortawesome/free-solid-svg-icons"

// item from sidebar data
export type Item = {
    path: string
    icon: JSX.Element
    title: string
}

const NavbarData: Item[] = [
    {
        title: "About",
        path: "https://developomp.com",
        icon: <FontAwesomeIcon icon={faUser} />,
    },
    {
        title: "Portfolio",
        path: "https://portfolio.developomp.com",
        icon: <FontAwesomeIcon icon={faFileLines} />,
    },
    {
        title: "Resume",
        path: "/resume",
        icon: <FontAwesomeIcon icon={faUserTie} />,
    },
]

export default NavbarData
