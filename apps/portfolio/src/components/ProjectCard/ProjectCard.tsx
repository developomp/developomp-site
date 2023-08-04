import "./style.scss"

import type { PortfolioProject } from "@developomp-site/content/src/types/types"
import Link from "next/link"

import Badge from "@/components/Badge"

interface ProjectCardProps {
    projectID: string
    project: PortfolioProject
}

export default function ProjectCard({ projectID, project }: ProjectCardProps) {
    return (
        <Link href={`/project/${projectID}`}>
            <div className="project">
                <h2 className="mb-4">{project.name}</h2>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    className="mb-4 w-full object-cover"
                    src={project.image}
                    alt="project thumbnail"
                />

                <div className="flex flex-wrap">
                    {project.badges.map((badge) => (
                        <Badge key={badge} slug={badge} />
                    ))}
                </div>
                <hr className="my-1" />
                <div
                    dangerouslySetInnerHTML={{
                        __html: project.overview,
                    }}
                />
            </div>
        </Link>
    )
}
