import "./style.scss"

import { PortfolioProject } from "@developomp-site/content/src/types/types"
import { type FC, useEffect, useState } from "react"

import Badge from "@/components/Badge"

interface ProjectCardProps {
    projectID: string
    project: PortfolioProject
}

const ProjectCard: FC<ProjectCardProps> = ({ projectID, project }) => {
    const [badges, setBadges] = useState<JSX.Element[]>([])

    useEffect(() => {
        setBadges(
            project.badges.map((badge) => <Badge key={badge} slug={badge} />)
        )
    }, [project.badges])

    return (
        <a href={`/project/${projectID}`}>
            <div className="project">
                <h2>{project.name}</h2>
                <img
                    className="mb-4 w-full object-cover"
                    src={project.image}
                    alt="project thumbnail"
                />

                <div className="flex flex-wrap">{badges}</div>
                <hr className="my-1" />
                <div
                    dangerouslySetInnerHTML={{
                        __html: project.overview,
                    }}
                />
            </div>
        </a>
    )
}

export default ProjectCard
