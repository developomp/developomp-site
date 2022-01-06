import { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"

import MainContent from "../../components/MainContent"
import ProjectCard from "./ProjectCard"

import portfolio from "../../data/portfolio.json"

import { PortfolioProject } from "../../../types/types"

const Portfolio = () => {
	const [projects, setProjects] = useState<JSX.Element[]>([])

	useEffect(() => {
		const _projects: JSX.Element[] = []

		for (const projectID in portfolio.projects) {
			_projects.push(
				<ProjectCard
					key={projectID}
					project={
						// eslint-disable-next-line @typescript-eslint/ban-ts-comment
						// @ts-ignore
						portfolio.projects[projectID] as PortfolioProject
					}
				/>
			)
		}

		setProjects(_projects)
	}, [])

	return (
		<>
			<Helmet>
				<title>pomp | Portfolio</title>

				<meta property="og:title" content="Portfolio" />
				<meta property="og:type" content="website" />
				<meta property="og:url" content="http://developomp.com" />
				<meta
					property="og:image"
					content="http://developomp.com/icon/icon.svg"
				/>
				<meta
					property="og:description"
					content="developomp's Portfolio"
				/>
			</Helmet>

			<MainContent>
				<h1>Portfolio</h1>
				<hr />
				<div dangerouslySetInnerHTML={{ __html: portfolio.overview }} />
			</MainContent>

			<br />

			{projects}
		</>
	)
}

export default Portfolio
