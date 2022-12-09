import { useContext } from "react"
import styled, { css } from "styled-components"
import { Link } from "react-router-dom"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	faArrowLeft,
	faArrowRight,
	faListUl,
} from "@fortawesome/free-solid-svg-icons"

import theming from "../../styles/theming"

import { globalContext } from "../../globalContext"

const Container = styled.div`
	display: flex;
	justify-content: space-between;
`

const buttonStyle = css`
	${theming.styles.navbarButtonStyle}

	background-color: ${(props) =>
		theming.theme(props.theme.currentTheme, {
			dark: "#202225",
			light: "#EEEEEE",
		})};
	border-radius: 0.5rem;
	height: 3rem;

	&:hover {
		background-color: ${(props) =>
			theming.theme(props.theme.currentTheme, {
				dark: theming.dark.backgroundColor1,
				light: theming.light.backgroundColor2,
			})};
	}
`

const Button = styled.div`
	${buttonStyle}
`

const DisabledButton = styled.div`
	${buttonStyle}

	color: grey;
	cursor: default;

	&:hover {
		background-color: ${(props) =>
			theming.theme(props.theme.currentTheme, {
				dark: "#202225",
				light: "#EEEEEE",
			})};
	}
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
