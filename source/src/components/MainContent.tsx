import styled, { css } from "styled-components"
import theming from "../styles/theming"

import Card from "./Card"

export const mainContentCSS = css`
	margin-top: 3rem;
	width: 50%;

	@media screen and (max-width: ${theming.size.screen_size1}) {
		width: auto;
		margin: 1rem;
		margin-top: 3rem;
	}
`

const MainContent = styled(Card)`
	${mainContentCSS}
`

export default MainContent
