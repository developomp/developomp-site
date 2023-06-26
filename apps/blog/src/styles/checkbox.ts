import { css } from "styled-components"

export default css`
	input[type="checkbox"] {
		/* default width and height */
		width: 13px;
		height: 13px;
	}

	input[type="checkbox"][disabled][checked] {
		filter: invert(100%) brightness(5);
	}

	input[type="checkbox"][disabled] {
		filter: invert(100%) brightness(5);
	}
`
