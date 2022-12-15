import styled from "styled-components"

import LocaleToggleButton from "./LocaleToggleButton"
import ThemeToggleButton from "./ThemeToggleButton"
import SearchButton from "./SearchButton"

const RightButtons = styled.div`
	display: flex;
	height: 100%;
	margin-left: auto;
`

export default () => {
	return (
		<RightButtons>
			<LocaleToggleButton />
			<ThemeToggleButton />
			<SearchButton />
		</RightButtons>
	)
}
