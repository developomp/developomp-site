import styled, { css } from "styled-components"
import theming from "../styles/theming"

import Card from "./Card"

export const mainContentCSS = css`
	width: 50%;

	@media screen and (max-width: ${theming.size.screen_size1}) {
		width: auto;
		margin: 1rem;
	}
`

const MainContent = styled(Card)`
	${mainContentCSS}
`

export default MainContent
