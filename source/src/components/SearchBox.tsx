import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import styled, { ThemeConsumer, css } from "styled-components"
import theme from "styled-theming"

const StyledSearchBoxContainer = styled.div`
	display: flex;
	justify-content: left;
	align-items: center;
	background-color: ${theme("mode", {
		light: "white",
		dark: "#202225",
	})};
	color: ${theme("mode", {
		light: "black",
		dark: "#CFD0D0",
	})};

	&:hover {
		background-color: ${theme("mode", {
			light: "whitesmoke",
			dark: "#36393F",
		})};
	}
`

const StyledSearchBox = styled.input`
	width: 80%;
	border: none;
	border-right: 1rem;
	outline: none;
	padding: 10px 10px;
	text-decoration: none;
	background-color: inherit;
	color: inherit;
`

const StyledSearchButton = styled(FontAwesomeIcon)`
	cursor: pointer;
`

function Navbar() {
	return (
		<StyledSearchBoxContainer>
			<StyledSearchBox type="text" name="search" placeholder="Search" />
			<StyledSearchButton icon={faSearch} />
		</StyledSearchBoxContainer>
	)
}

export default Navbar
