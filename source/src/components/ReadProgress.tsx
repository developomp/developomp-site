import { useCallback, useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import styled from "styled-components"

import theming from "../styles/theming"

const StyledReadProgressBackground = styled.div`
	height: 0.2rem;
	background-color: ${(props) =>
		theming.theme(props.theme.currentTheme, {
			light: "silver",
			dark: "darkslategrey",
		})};
`

const StyledReadProgress = styled.div`
	height: 100%;
	background-color: ${(props) =>
		theming.theme(props.theme.currentTheme, {
			light: theming.light.color0,
			dark: theming.dark.color2,
		})};
`

const st = "scrollTop"
const sh = "scrollHeight"
const h = document.documentElement
const b = document.body

const ReadProgress = () => {
	const [scroll, setScroll] = useState(0)
	const location = useLocation()

	// https://stackoverflow.com/a/8028584/12979111
	const scrollHandler = useCallback(() => {
		setScroll(((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100)
	}, [])

	useEffect(() => {
		const resizeObserver = new ResizeObserver(() => {
			scrollHandler()
		})

		resizeObserver.observe(document.body)
		window.addEventListener("scroll", scrollHandler)

		return () => {
			resizeObserver.disconnect()
			window.removeEventListener("scroll", scrollHandler)
		}
	}, [])

	// update on path change
	useEffect(() => {
		setTimeout(() => {
			scrollHandler()
		}, 100)
	}, [location])

	return (
		<StyledReadProgressBackground>
			<StyledReadProgress style={{ width: `${scroll}%` }} />
		</StyledReadProgressBackground>
	)
}

export default ReadProgress
