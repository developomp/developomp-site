import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

import Badge from "../../components/Badge"
import { cardCSS } from "../../components/Card"

import { PortfolioProject } from "../../../types/types"
import theming from "../../styles/theming"
import { globalContext } from "../../globalContext"

const StyledProjectCard = styled.div`
	${cardCSS}
	${theming.styles.hoverCard}

	margin-bottom: 2rem;
	word-wrap: break-word;

	color: ${(props) =>
		theming.theme(props.theme.currentTheme, {
			light: theming.light.color1,
			dark: theming.dark.color1,
		})};
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
	const [badges, setBadges] = useState<JSX.Element[]>([])

	useEffect(() => {
		setBadges(project.badges.map((badge) => <Badge key={badge} slug={badge} />))
	}, [])

	return (
		<Link to={`/${globalState.locale}${projectID}`}>
			<StyledProjectCard>
				<h1>{project.name}</h1>
				<StyledImg src={project.image} />

				{badges}
				<hr />
				<div dangerouslySetInnerHTML={{ __html: project.overview }} />
			</StyledProjectCard>
		</Link>
	)
}

export default ProjectCard
