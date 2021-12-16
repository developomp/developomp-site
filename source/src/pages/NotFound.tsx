import styled from "styled-components"
import { Helmet } from "react-helmet-async"

import theming from "../styles/theming"

const StyledNotFound = styled.div`
	text-align: center;

	color: ${(props) =>
		theming.theme(props.theme.currentTheme, {
			light: "#111111",
			dark: "#EEEEEE",
		})};
`

const Styled404 = styled.h1`
	font-size: 5rem;
`

const NotFound = () => {
	return (
		<>
			<Helmet>
				<title>pomp | 404</title>

				<meta property="og:title" content="Page Not Found" />
				<meta property="og:type" content="website" />
				<meta property="og:url" content="http://developomp.com" />
				<meta
					property="og:image"
					content="http://developomp.com/icon/icon.svg"
				/>
				<meta property="og:description" content="Page does not exist" />
			</Helmet>

			<StyledNotFound className="card main-content">
				<Styled404>404</Styled404>
				<br />
				Page was not found :(
			</StyledNotFound>
		</>
	)
}

export default NotFound
