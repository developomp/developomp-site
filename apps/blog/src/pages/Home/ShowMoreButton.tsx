import { useContext } from "react"
import styled from "styled-components"

import { globalContext } from "../../globalContext"
import buttonStyle from "../../styles/button"

const Button = styled.button`
	${buttonStyle}

	/* center div */
	margin: 0 auto;
`

interface Props {
	action(): void
}

export default (props: Props) => {
	const { globalState } = useContext(globalContext)

	return (
		<Button onClick={props.action}>
			{globalState.locale == "en" ? "Show more posts" : "더 많은 포스트 보이기"}
		</Button>
	)
}
