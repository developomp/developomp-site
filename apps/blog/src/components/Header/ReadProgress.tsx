import { useCallback, useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import styled from "styled-components"

const Background = styled.div`
	height: 0.2rem;
	background-color: ${({ theme }) =>
		theme.theme.component.scrollProgressBar.color.background};
`

const ProgressBar = styled.div`
	height: 100%;
	background-color: ${({ theme }) =>
		theme.theme.component.scrollProgressBar.color.foreground};
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
		<Background>
			<ProgressBar style={{ width: `${scroll}%` }} />
		</Background>
	)
}

export default ReadProgress
