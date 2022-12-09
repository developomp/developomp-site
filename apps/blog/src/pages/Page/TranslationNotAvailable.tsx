import { useContext } from "react"
import styled from "styled-components"
import { Helmet } from "react-helmet-async"

import MainContent from "../../components/MainContent"

import { globalContext } from "../../globalContext"

const Card = styled(MainContent)`
	text-align: center;
`

const Title = styled.h1`
	font-size: 3rem;
`

const TranslationNotAvailable = () => {
	const { globalState } = useContext(globalContext)
	const { locale } = globalState

	const localized_title =
		locale == "en" ? "Translation not found" : "번역이 존재하지 않습니다"

	return (
		<>
			<Helmet>
				<title>pomp | {localized_title}</title>

				<meta property="og:title" content={localized_title} />
				<meta
					property="og:image"
					content="http://developomp.com/icon/icon.svg"
				/>
				<meta
					property="og:description"
					content={
						locale == "en"
							? "This content is not available in English."
							: "본 내용의 한국어 번역이 존재하지 않습니다"
					}
				/>
			</Helmet>

			<Card>
				<Title>{localized_title}</Title>
				<br />
				{locale == "en" ? (
					<>
						This post is only available in <b>Korean (한국어)</b>.
					</>
				) : (
					<>
						본 내용은 <b>영어(English)</b> 로만 제공됩니다.
					</>
				)}
			</Card>
		</>
	)
}

export default TranslationNotAvailable
