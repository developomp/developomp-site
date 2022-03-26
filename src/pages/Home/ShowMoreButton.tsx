import { useContext } from "react"
import styled from "styled-components"

import theming from "../../styles/theming"
import { globalContext } from "../../globalContext"

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
	const { globalState } = useContext(globalContext)

	return (
		<Button onClick={props.action}>
			{globalState.locale == "en" ? "Show more posts" : "더 많은 포스트 보이기"}
		</Button>
	)
}

export default ShowMoreButton
