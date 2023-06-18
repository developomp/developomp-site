import { useEffect, useState } from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

import Badge from "../../components/Badge"
import { cardCSS } from "../../components/Card"

import { PortfolioProject } from "@developomp-site/blog-content/src/types/types"

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

	const [badges, setBadges] = useState<JSX.Element[]>([])

	useEffect(() => {
		setBadges(project.badges.map((badge) => <Badge key={badge} slug={badge} />))
	}, [])

	return (
		<Link to={projectID}>
			<StyledProjectCard>
				<h1>{project.name}</h1>
				<StyledImg src={project.image} />

				{badges}
				<hr />
				<div
					dangerouslySetInnerHTML={{
						__html: project.overview,
					}}
				/>
			</StyledProjectCard>
		</Link>
	)
}

export default ProjectCard
