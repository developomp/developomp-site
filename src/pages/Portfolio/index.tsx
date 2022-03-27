import { useContext, useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"

import MainContent from "../../components/MainContent"
import Badge from "../../components/Badge"
import ProjectCard from "./ProjectCard"

import portfolio from "../../data/portfolio.json"

import { globalContext } from "../../globalContext"

import type { PortfolioProject } from "../../../types/types"

const Portfolio = () => {
	const { globalState } = useContext(globalContext)
	const locale = globalState.locale

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
				<title>pomp | {locale == "en" ? "Portfolio" : "포트폴리오"}</title>

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
				<h1>{locale == "en" ? "Portfolio" : "포트폴리오"}</h1>

				<hr />

				{/* rendered markdown */}

				<div
					dangerouslySetInnerHTML={{
						__html:
							locale == "en" ? portfolio.overview_en : portfolio.overview_kr,
					}}
				/>

				{/* Projects */}

				<h2 id="projects">
					<a className="header-anchor" href="#projects">
						#
					</a>{" "}
					{locale == "en" ? "Projects" : "프로젝트"}
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
