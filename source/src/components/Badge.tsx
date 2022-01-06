import { useEffect, useState } from "react"
import styled from "styled-components"

import theming from "../styles/theming"

const StyledBadge = styled.div<{ color: string; isDark: boolean }>`
	vertical-align: middle;
	display: inline-block;

	padding: 0.2rem 0.4rem 0 0.4rem;
	margin-right: 0.4rem;

	font-size: 0.8rem;

	background-color: ${(props) => props.color};
	color: ${(props) =>
		props.isDark ? theming.dark.color1 : theming.light.color1};
`

const StyledSVG = styled.div<{ isDark: boolean }>`
	display: inline-block;
	vertical-align: middle;

	margin-right: 0.2rem;

	svg {
		height: 16px;
		fill: ${(props) =>
			props.isDark
				? theming.dark.color1
				: theming.light.color1} !important;
	}
`

interface Badge {
	svg: string
	hex: string
	isDark: boolean
	title: string
}

interface BadgeProps {
	slug: string
}

const Badge = (props: BadgeProps) => {
	const [badgeData, setBadgeData] = useState<Badge | undefined>(undefined)
	const { slug } = props

	const getBadgeData = async () => {
		return await require(`../data/icons/${slug}.json`)
	}

	useEffect(() => {
		getBadgeData().then((data) => {
			setBadgeData(data)
		})
	}, [])

	if (!badgeData) return <></>

	return (
		<StyledBadge color={badgeData.hex} isDark={badgeData.isDark}>
			<StyledSVG
				isDark={badgeData.isDark}
				dangerouslySetInnerHTML={{ __html: badgeData.svg }}
			/>
			<span>{badgeData.title}</span>
		</StyledBadge>
	)
}

export default Badge
