import styled from "styled-components"

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
	return <Button onClick={props.action}>Show more posts</Button>
}
