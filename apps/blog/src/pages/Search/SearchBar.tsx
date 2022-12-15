import styled from "styled-components"

export default styled.input`
	width: 100%;
	border-radius: 100px; /* arbitrarily large value */
	height: 2.5rem;
	text-align: center;
	font-size: 1.2rem;
	outline: none;
	color: ${({ theme }) => theme.theme.color.text.default};
	border: 1px solid
		${(props) => props.theme.theme.component.input.color.border.default};
	background-color: ${(props) =>
		props.theme.theme.component.input.color.background.default};

	::placeholder {
		color: ${(props) => props.theme.theme.component.input.color.placeHolder};
		opacity: 1;
	}

	&:hover {
		border: 1px solid
			${({ theme }) => theme.theme.component.input.color.border.hover};
	}

	&:focus {
		border: 1px solid
			${({ theme }) => theme.theme.component.input.color.border.focus};
	}
`
