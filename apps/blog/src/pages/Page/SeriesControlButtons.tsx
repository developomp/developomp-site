import { useContext } from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	faArrowLeft,
	faArrowRight,
	faListUl,
} from "@fortawesome/free-solid-svg-icons"

import buttonStyle from "../../styles/button"
import { globalContext } from "../../globalContext"

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
	const { globalState } = useContext(globalContext)
	const { locale } = globalState

	return (
		<Container>
			{prevURL ? (
				<Link to={`/${locale}${prevURL}`}>
					<Button>
						<FontAwesomeIcon icon={faArrowLeft} />
					</Button>
				</Link>
			) : (
				<DisabledButton>
					<FontAwesomeIcon icon={faArrowLeft} />
				</DisabledButton>
			)}

			<Link to={`/${locale}${seriesHome}`}>
				<Button>
					<FontAwesomeIcon icon={faListUl} />
				</Button>
			</Link>

			{nextURL ? (
				<Link to={`/${locale}${nextURL}`}>
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
