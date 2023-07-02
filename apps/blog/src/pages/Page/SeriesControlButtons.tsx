import {
    faArrowLeft,
    faArrowRight,
    faListUl,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"
import styled from "styled-components"

import buttonStyle from "../../styles/button"

const Container = styled.div`
    display: flex;
    justify-content: space-between;
`

const Button = styled.div`
    ${buttonStyle}
`

const DisabledButton = styled.div`
    ${buttonStyle}

    color: grey;
    cursor: default;
`

interface Props {
    seriesHome: string
    prevURL?: string
    nextURL?: string
}

function SeriesControlButtons({ prevURL, seriesHome, nextURL }: Props) {
    return (
        <Container>
            {prevURL ? (
                <Link to={prevURL}>
                    <Button>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </Button>
                </Link>
            ) : (
                <DisabledButton>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </DisabledButton>
            )}

            <Link to={seriesHome}>
                <Button>
                    <FontAwesomeIcon icon={faListUl} />
                </Button>
            </Link>

            {nextURL ? (
                <Link to={nextURL}>
                    <Button>
                        <FontAwesomeIcon icon={faArrowRight} />
                    </Button>
                </Link>
            ) : (
                <DisabledButton>
                    <FontAwesomeIcon icon={faArrowRight} />
                </DisabledButton>
            )}
        </Container>
    )
}

export default SeriesControlButtons
