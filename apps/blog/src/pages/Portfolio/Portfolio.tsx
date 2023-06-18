import { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"

import MainContent from "../../components/MainContent"
import Badge from "../../components/Badge"
import ProjectCard from "./ProjectCard"

import portfolio from "@developomp-site/blog-content/dist/portfolio.json"

import type { PortfolioProject } from "@developomp-site/blog-content/src/types/types"

const Portfolio = () => {
	const [projects, setProjects] = useState<JSX.Element[]>([])
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [skills, setSkills] = useState<JSX.Element[]>([])

	useEffect(() => {
		const _projects: JSX.Element[] = []

		for (const projectID in portfolio.projects) {
			_projects.push(
				<ProjectCard
					key={projectID}
					projectID={projectID}
					project={
						// eslint-disable-next-line @typescript-eslint/ban-ts-comment
						// @ts-ignore
						portfolio.projects[projectID] as PortfolioProject
					}
				/>
			)
		}

		setProjects(_projects)

		setSkills(
			portfolio.skills.map((slug) => {
				return <Badge key={slug} slug={slug} />
			})
		)
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
				<meta property="og:description" content="developomp's Portfolio" />
			</Helmet>

			<MainContent>
				<h1>Portfolio</h1>

				<hr />

				{/* Projects */}

				<h2 id="projects">
					<a className="header-anchor" href="#projects">
						#
					</a>
					{" Projects"}
				</h2>

				{/* todo: filter projects by skill */}

				{skills}

				<br />
				<br />

				{projects}
			</MainContent>
		</>
	)
}

export default Portfolio
