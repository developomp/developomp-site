import "./style.scss"

import portfolio from "@developomp-site/blog-content/dist/portfolio.json"
import { useMeta, useTitle } from "hoofd"
import { type FC, useEffect, useState } from "react"
import { useRoute } from "wouter"

import Badge from "@/components/Badge"
import Loading from "@/components/Loading"
import Toc from "@/components/Toc"
import NotFound from "@/routes/NotFound"

export interface PageData {
    title: string
    toc?: string
    content: string

    image: string // image url
    overview: string
    badges: string[]
    repo: string
}

const Project: FC = () => {
    const [pageData, setPageData] = useState<PageData | undefined>(undefined)
    const [isLoading, setIsLoading] = useState(true)

    const [match, params] = useRoute("/project/:id")

    useTitle(pageData?.title || "Loading")
    useMeta({ property: "og:title", content: pageData?.title })

    useEffect(() => {
        if (!match) return
        ;(async () => {
            try {
                if (!(params.id in portfolio.projects)) return

                const data =
                    portfolio.projects[
                        params.id as keyof typeof portfolio.projects
                    ]

                const fetched_content = await import(
                    `@developomp-site/blog-content/dist/content/projects/${params.id}.json`
                )

                setPageData({
                    content: fetched_content.content,
                    toc: fetched_content.toc,
                    title: data.name,
                    image: data.image,
                    overview: data.overview,
                    badges: data.badges,
                    repo: data.repo,
                })
            } catch {
                return
            }

            setIsLoading(false)
        })()
    }, [match, params])

    if (!match) return <NotFound />
    if (isLoading) return <Loading />
    if (!pageData) return <NotFound />

    return (
        <>
            <h1 className="mb-4 text-4xl">{pageData.title}</h1>
            <div className="flex flex-wrap">
                {pageData.badges.map((slug) => {
                    return <Badge key={slug} slug={slug} />
                })}
            </div>
            <hr />

            <Toc data={pageData.toc} />

            {/* page content */}
            <div
                className="project-description"
                dangerouslySetInnerHTML={{
                    __html: pageData.content,
                }}
            />
        </>
    )
}

export default Project
