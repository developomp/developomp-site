import styled from "styled-components"

import theming from "../../styles/theming"

const Button = styled.button`
	/* size */

	padding: 1rem;

	/* styling */

	display: inline-block;
	border: none;
	cursor: pointer;
	border-radius: 0.5rem;

	/* text */

	text-align: center;
	text-decoration: none;
	font-size: 1rem;

	/* colors */

	color: ${(props) =>
		theming.theme(props.theme.currentTheme, {
			light: "black",
			dark: "#CFD0D0",
		})};
	background-color: ${(props) =>
		theming.theme(props.theme.currentTheme, {
			light: theming.light.backgroundColor2,
			dark: theming.dark.backgroundColor2,
		})};

	:hover {
		background-color: ${(props) =>
			theming.theme(props.theme.currentTheme, {
				light: theming.light.backgroundColor0,
				dark: theming.dark.backgroundColor0,
			})};
	}
`

interface Props {
	action(): void
}

const ShowMoreButton = (props: Props) => {
	return <Button onClick={props.action}>Show more posts...</Button>
}

export default ShowMoreButton
