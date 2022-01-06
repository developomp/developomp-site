import styled from "styled-components"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import MainContent from "../../components/MainContent"
import Badge from "../../components/Badge"

import { PortfolioProject } from "../../../types/types"
import theming from "../../styles/theming"

const StyledProjectCard = styled(MainContent)`
	margin-bottom: 2rem;
`

const StyledImg = styled.img`
	width: 100%;

	object-fit: cover;
	margin-bottom: 1rem;
`

const StyledGithubLink = styled.a`
	display: flex;
	float: right;

	align-items: center;
	gap: 0.5rem;

	margin-top: 1.5rem;

	color: ${(props) =>
		theming.theme(props.theme.currentTheme, {
			light: theming.light.color1,
			dark: theming.dark.color1,
		})};

	svg {
		font-size: 2rem;
	}
`

interface ProjectCardProps {
	project: PortfolioProject
}

const ProjectCard = (props: ProjectCardProps) => {
	const { project } = props

	return (
		<StyledProjectCard>
			<StyledGithubLink href={project.repo}>
				<FontAwesomeIcon icon={faGithub} />
				Github
			</StyledGithubLink>
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
