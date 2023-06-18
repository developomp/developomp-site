import dark from "@developomp-site/theme/dist/dark.json"
import light from "@developomp-site/theme/dist/light.json"

import { Badge } from "@developomp-site/blog-content/src/types/types"
import { useEffect, useState } from "react"
import styled from "styled-components"

const StyledBadge = styled.div<{ color: string; isDark: boolean }>`
	vertical-align: middle;
	display: inline-block;

	padding: 0.2rem 0.4rem 0 0.4rem;
	margin-right: 0.4rem;
	margin-bottom: 0.4rem;

	font-size: 0.8rem;

	background-color: ${(props) => props.color};
	color: ${(props) =>
		props.isDark ? dark.color.text.default : light.color.text.default};
`

const StyledSVG = styled.div<{ isDark: boolean }>`
	display: inline-block;
	vertical-align: middle;

	margin-right: 0.2rem;

	svg {
		height: 16px;
		fill: ${(props) =>
			props.isDark
				? dark.color.text.default
				: light.color.text.default} !important;
	}
`

interface BadgeProps {
	slug: string
}

export default (props: BadgeProps) => {
	const [badgeData, setBadgeData] = useState<Badge | undefined>(undefined)
	const { slug } = props

	const getBadgeData = async () => {
		return await require(`@developomp-site/blog-content/dist/icons/${slug}.json`)
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
