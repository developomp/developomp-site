import { useContext } from "react"
import { Link } from "react-router-dom"
import ReactTooltip from "react-tooltip"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"

import { StyledLink } from "./Navbar"

import { globalContext } from "../../globalContext"

const SearchButton = () => {
	const { globalState } = useContext(globalContext)

	return (
		<>
			<div>
				<Link
					data-tip
					data-for="search"
					to={`${process.env.PUBLIC_URL}/search`}
				>
					<StyledLink>
						<FontAwesomeIcon icon={faSearch} />
					</StyledLink>
				</Link>
			</div>
			<ReactTooltip id="search" type="dark" effect="solid">
				<span>{globalState.locale == "en" ? "Search" : "검색"}</span>
			</ReactTooltip>
		</>
	)
}

export default SearchButton
