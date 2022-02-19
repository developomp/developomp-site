import styled, { css } from "styled-components"
import { Link } from "react-router-dom"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	faArrowLeft,
	faArrowRight,
	faListUl,
} from "@fortawesome/free-solid-svg-icons"

import theming from "../../styles/theming"

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

const SeriesControlButtons = (props: {
	seriesHome: string
	prevURL?: string
	nextURL?: string
}) => {
	return (
		<Container>
			{props.prevURL ? (
				<Link to={props.prevURL}>
					<Button>
						<FontAwesomeIcon icon={faArrowLeft} />
					</Button>
				</Link>
			) : (
				<DisabledButton>
					<FontAwesomeIcon icon={faArrowLeft} />
				</DisabledButton>
			)}

			<Link to={props.seriesHome}>
				<Button>
					<FontAwesomeIcon icon={faListUl} />
				</Button>
			</Link>

			{props.nextURL ? (
				<Link to={props.nextURL}>
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
