import { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"

import MainContent from "../../components/MainContent"
import ProjectCard from "./ProjectCard"
import Badge from "../../components/Badge"

import portfolio from "../../data/portfolio.json"

import { PortfolioProject } from "../../../types/types"

const Portfolio = () => {
	const [projects, setProjects] = useState<JSX.Element[]>([])
	const [skills, setSkills] = useState<JSX.Element[]>([])

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
				<meta
					property="og:description"
					content="developomp's Portfolio"
				/>
			</Helmet>

			<MainContent>
				<h1>Portfolio</h1>
				<hr />
				<div dangerouslySetInnerHTML={{ __html: portfolio.overview }} />
				<h2 id="skills">
					<a className="header-anchor" href="#skills">
						#
					</a>{" "}
					Skills
				</h2>

				<img
					alt="programming skills"
					src="/img/skills.svg"
					// center image
					style={{
						display: "block",
						marginLeft: "auto",
						marginRight: "auto",
					}}
				/>

				<br />
				{skills}
			</MainContent>

			<br />

			{projects}
		</>
	)
}

export default Portfolio
