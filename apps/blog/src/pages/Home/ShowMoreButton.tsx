import { type FC } from "react"
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

const ShowMoreButton: FC<Props> = (props) => {
    return <Button onClick={props.action}>Show more posts</Button>
}

export default ShowMoreButton
