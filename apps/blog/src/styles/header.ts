import { css } from "styled-components"

export default css`
	/* intentionally left out h1 */
	h2,
	h3,
	h4,
	h5,
	h6 {
		margin-top: 3rem;
		padding-top: 0.5rem;
		margin-bottom: 0.5rem;
		font-weight: 700;
	}

	h1 {
		font-size: 2.5rem;
	}
	h2 {
		font-size: 1.5rem;
	}
	h3 {
		font-size: 1rem;
		text-indent: 0.5rem;
	}
	h4 {
		font-size: 1rem;
		text-indent: 1rem;
	}
	h5 {
		font-size: 1rem;
		text-indent: 1.5rem;
	}
	h6 {
		font-size: 1rem;
		text-indent: 2rem;
	}
`
