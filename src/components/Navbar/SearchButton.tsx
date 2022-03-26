import { Link } from "react-router-dom"
import ReactTooltip from "react-tooltip"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"

import { StyledLink } from "./Navbar"

const SearchButton = () => {
	return (
		<>
			<div style={{ height: "100%" }}>
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
				<span>Search</span>
			</ReactTooltip>
		</>
	)
}

export default SearchButton
