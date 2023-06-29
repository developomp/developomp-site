import "./style.scss"

import portfolio from "@developomp-site/blog-content/dist/portfolio.json"
import type { PortfolioProject } from "@developomp-site/blog-content/src/types/types"
import { useMeta, useTitle } from "hoofd"
import { type FC } from "react"

import Badge from "@/components/Badge"
import ProjectCard from "@/components/ProjectCard"

const projects: JSX.Element[] = []
const skills: JSX.Element[] = portfolio.skills.map((slug) => {
    return <Badge key={slug} slug={slug} />
})

for (const projectID in portfolio.projects) {
    projects.push(
        <ProjectCard
            key={projectID}
            projectID={projectID}
            project={
                portfolio.projects[
                    projectID as keyof typeof portfolio.projects
                ] as PortfolioProject
            }
        />
    )
}

const Home: FC = () => {
    useTitle("Home")
    useMeta({ property: "og:title", content: "Home" })

    return (
        <>
            <h1 className="mb-8 text-5xl">developomp's Portfolio</h1>
            <hr />
            <div className="my-4 flex flex-wrap">{skills}</div>
            <div className="projects">{projects}</div>
        </>
    )
}

export default Home
