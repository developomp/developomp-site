import styled from "styled-components"
import { Link } from "react-router-dom"

import theming from "../../styles/theming"

const StyledNextPrevContainer = styled.div`
	display: flex;
	justify-content: space-between;
	size: 100%;
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
	margin-top: 2rem;

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
	margin-top: 2rem;

	line-height: 1rem;
	text-align: center;
	user-select: none;
`

const NextPrevButtons = (props: { prevURL?: string; nextURL?: string }) => {
	return (
		<StyledNextPrevContainer>
			{props.prevURL ? (
				<StyledLink to={props.prevURL}>prev</StyledLink>
			) : (
				<StyledDisabledLink>prev</StyledDisabledLink>
			)}
			{props.nextURL ? (
				<StyledLink to={props.nextURL}>next</StyledLink>
			) : (
				<StyledDisabledLink>next</StyledDisabledLink>
			)}
		</StyledNextPrevContainer>
	)
}

export default NextPrevButtons
