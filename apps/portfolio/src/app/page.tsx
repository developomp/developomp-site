import type { ProjectKey } from "@developomp-site/content/exports/portfolio"
import portfolio from "@developomp-site/content/exports/portfolio"
import type { Metadata } from "next"

import Badge from "@/components/Badge"
import ProjectCard from "@/components/ProjectCard"

function getSkills(): JSX.Element[] {
    return portfolio.skills.map((slug) => {
        return <Badge key={slug} slug={slug} />
    })
}

function getProjects(): JSX.Element[] {
    return (Object.keys(portfolio.projects) as ProjectKey[]).map(
        (projectID) => (
            <ProjectCard
                key={projectID}
                projectID={projectID}
                project={portfolio.projects[projectID]}
            />
        ),
    )
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
