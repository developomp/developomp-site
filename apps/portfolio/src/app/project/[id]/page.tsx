import "./style.scss"

import Toc from "@developomp-site/blog/src/app/[category]/[[...slug]]/Toc"
import portfolio from "@developomp-site/content/dist/portfolio.json"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { type Metadata } from "next"
import Link from "next/link"

import Badge from "@/components/Badge"

interface Data {
    title: string
    toc?: string
    content: string

    image: string // image url
    overview: string
    badges: string[]
    repo: string
}

interface Params {
    id: keyof typeof portfolio.projects
}

interface Props {
    params: Params
}

async function getData(id: keyof typeof portfolio.projects): Promise<Data> {
    const content = await import(
        `@developomp-site/content/dist/content/projects/${id}.json`
    )
    const data = portfolio.projects[id]

    return {
        content: content.content,
        toc: content.toc,
        title: data.name,
        image: data.image,
        overview: data.overview,
        badges: data.badges,
        repo: data.repo,
    }
}

export async function generateStaticParams(): Promise<Params[]> {
    return (
        Object.keys(portfolio.projects) as (keyof typeof portfolio.projects)[]
    ).map((id) => ({ id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const data = await getData(params.id)
    return {
        metadataBase: new URL("https://portfolio.developomp.com"),
        title: data.title,
        openGraph: {
            title: `pomp's portfolio | ${data.title}`,
        },
    }
}

export default async function Project({ params }: Props) {
    const data = await getData(params.id)

    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="mb-4  text-4xl">{data.title}</h1>
                <Link
                    href={data.repo}
                    className="text-dark-text-default duration-100 hover:text-gray-400"
                >
                    <FontAwesomeIcon className="h-12" icon={faGithub} />
                </Link>
            </div>
            <div className="flex flex-wrap">
                {data.badges.map((slug) => {
                    return <Badge key={slug} slug={slug} />
                })}
            </div>
            <hr />

            <Toc data={data.toc} />

            {/* page content */}
            <div
                className="project-description"
                dangerouslySetInnerHTML={{
                    __html: data.content,
                }}
            />
        </>
    )
}
