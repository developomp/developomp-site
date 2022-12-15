import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

import Badge from "../../components/Badge"
import { cardCSS } from "../../components/Card"

import { PortfolioProject } from "../../../types/types"
import { globalContext } from "../../globalContext"

const StyledProjectCard = styled.div`
	${cardCSS}

	color: ${(props) => props.theme.theme.color.text.default};
	margin-bottom: 2rem;
	word-wrap: break-word;

	:hover {
		cursor: pointer;

		box-shadow: 0 4px 10px
			${(props) => props.theme.theme.component.card.color.hoverGlow};
	}
`

const StyledImg = styled.img`
	width: 100%;

	object-fit: cover;
	margin-bottom: 1rem;
`

interface ProjectCardProps {
	projectID: string
	project: PortfolioProject
}

const ProjectCard = (props: ProjectCardProps) => {
	const { projectID, project } = props

	const { globalState } = useContext(globalContext)
	const { locale } = globalState

	const [badges, setBadges] = useState<JSX.Element[]>([])

	useEffect(() => {
		setBadges(project.badges.map((badge) => <Badge key={badge} slug={badge} />))
	}, [])

	return (
		<Link to={`/${locale}${projectID}`}>
			<StyledProjectCard>
				<h1>{project.name}</h1>
				<StyledImg src={project.image} />

				{badges}
				<hr />
				<div
					dangerouslySetInnerHTML={{
						__html: locale == "en" ? project.overview_en : project.overview_kr,
					}}
				/>
			</StyledProjectCard>
		</Link>
	)
}

export default ProjectCard
