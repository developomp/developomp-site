import { css } from "styled-components"

export default css`
	mark {
		background-color: ${({ theme }) =>
			theme.theme.component.mark.color.background};
		color: ${({ theme }) => theme.theme.component.mark.color.text};
	}
`
