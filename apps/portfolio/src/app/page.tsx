import portfolio from "@developomp-site/content/dist/portfolio.json"
import type { PortfolioProject } from "@developomp-site/content/src/types/types"
import type { Metadata } from "next"

import Badge from "@/components/Badge"
import ProjectCard from "@/components/ProjectCard"

function getSkills(): JSX.Element[] {
    return portfolio.skills.map((slug) => {
        return <Badge key={slug} slug={slug} />
    })
}

function getProjects(): JSX.Element[] {
    const projects = []

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

    return projects
}

export const metadata: Metadata = {
    metadataBase: new URL("https://blog.developomp.com"),
    title: "pomp's portfolio | Home",
}

export default function Page() {
    return (
        <>
            <h1 className="mb-8">developomp's Portfolio</h1>
            <hr />
            <div className="my-4 flex flex-wrap gap-2">{getSkills()}</div>
            <div className="projects">{getProjects()}</div>
        </>
    )
}
