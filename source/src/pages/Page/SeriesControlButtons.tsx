import styled from "styled-components"
import { Link } from "react-router-dom"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	faArrowLeft,
	faArrowRight,
	faListUl,
} from "@fortawesome/free-solid-svg-icons"

import theming from "../../styles/theming"

const StyledContainer = styled.div`
	display: flex;
	justify-content: space-between;
	size: 100%;

	line-height: 1rem;
`

const StyledLink = styled(Link)`
	${theming.styles.navbarButtonStyle}

	background-color: ${(props) =>
		theming.theme(props.theme.currentTheme, {
			light: "#EEEEEE",
			dark: "#202225",
		})};

	height: 1rem;
	width: 2rem;

	line-height: 1rem;
	text-align: center;
`

const StyledDisabledLink = styled.div`
	font-size: 1rem;
	border-radius: 0.5rem;
	float: left;
	padding: 14px 16px;
	text-decoration: none;
	transition: transform 0.1s linear;
	color: grey;
	background-color: ${(props) =>
		theming.theme(props.theme.currentTheme, {
			light: "#EEEEEE",
			dark: "#202225",
		})};

	height: 1rem;
	width: 2rem;

	line-height: 1rem;
	text-align: center;
	user-select: none;
`

const SeriesControlButtons = (props: {
	seriesHome: string
	prevURL?: string
	nextURL?: string
}) => {
	return (
		<StyledContainer>
			{props.prevURL ? (
				<StyledLink to={props.prevURL}>
					<FontAwesomeIcon icon={faArrowLeft} />
				</StyledLink>
			) : (
				<StyledDisabledLink>
					<FontAwesomeIcon icon={faArrowLeft} />
				</StyledDisabledLink>
			)}

			<StyledLink to={props.seriesHome}>
				<FontAwesomeIcon icon={faListUl} />
			</StyledLink>

			{props.nextURL ? (
				<StyledLink to={props.nextURL}>
					<FontAwesomeIcon icon={faArrowRight} />
				</StyledLink>
			) : (
				<StyledDisabledLink>
					<FontAwesomeIcon icon={faArrowRight} />
				</StyledDisabledLink>
			)}
		</StyledContainer>
	)
}

export default SeriesControlButtons
