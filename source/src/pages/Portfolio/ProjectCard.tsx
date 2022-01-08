import styled from "styled-components"
import { useNavigate } from "react-router-dom"

import Badge from "../../components/Badge"
import Card from "../../components/Card"

import { PortfolioProject } from "../../../types/types"
import theming from "../../styles/theming"

const StyledProjectCard = styled(Card)`
	margin-bottom: 2rem;

	${theming.styles.hoverCard}
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

	const navigate = useNavigate()

	return (
		<StyledProjectCard
			onClick={() => navigate(process.env.PUBLIC_URL + projectID)}
		>
			<h1>{project.name}</h1>
			<StyledImg src={project.image} />

			{project.badges.map((badge) => {
				return <Badge key={badge} slug={badge} />
			})}
			<hr />
			<div dangerouslySetInnerHTML={{ __html: project.overview }} />
		</StyledProjectCard>
	)
}

export default ProjectCard
