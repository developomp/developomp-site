import { Link } from "react-router-dom"
import ReactTooltip from "react-tooltip"

import HeaderButton from "../HeaderButton"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"

const SearchButton = () => {
	return (
		<>
			<div>
				<Link data-tip data-for="search" to="/search">
					<HeaderButton>
						<FontAwesomeIcon icon={faSearch} />
					</HeaderButton>
				</Link>
			</div>
			<ReactTooltip id="search" type="dark" effect="solid">
				<span>Search</span>
			</ReactTooltip>
		</>
	)
}

export default SearchButton
