import { useContext } from "react"
import styled from "styled-components"
import { Helmet } from "react-helmet-async"

import MainContent from "../components/MainContent"

import { globalContext } from "../globalContext"

const StyledNotFound = styled(MainContent)`
	text-align: center;
`

const Styled404 = styled.h1`
	font-size: 5rem;
`

const NotFound = () => {
	const { globalState } = useContext(globalContext)

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

			<StyledNotFound>
				<Styled404>404</Styled404>
				<br />
				{globalState.locale == "en"
					? "Page was not found :("
					: "페이지를 찾을 수 없습니다 :("}
			</StyledNotFound>
		</>
	)
}

export default NotFound
