import "./Page.scss"

import contentMap from "@developomp-site/content/exports/contentMap"
import { type Metadata } from "next"
import { type ParsedUrlQuery } from "querystring"

import { metadata as notFoundMetadata } from "@/app/not-found"
import Card from "@/components/Card"
import PostCard from "@/components/PostCard"
import Tag from "@/components/Tag"
import TagList from "@/components/TagList"

import { getData, PageType } from "./helper"
import Meta from "./Meta"
import SeriesControlButtons from "./SeriesControlButtons"
import Toc from "./Toc"

export interface Params extends ParsedUrlQuery {
    category: "posts" | "series"
    slug: string[]
}

interface Props {
    params: Params
}

/**
 * https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamicparams
 */
export const dynamicParams = false

/**
 * https://nextjs.org/docs/app/api-reference/functions/generate-static-params
 */
export async function generateStaticParams(): Promise<Params[]> {
    return Object.keys(contentMap.posts).map((key) => {
        const contentID = key.replace(/\/$/, "") // remove trailing slash
        const parts = contentID
            .split("/") // /a/b/c/ => ['', 'a', 'b', 'c', '']
            .filter((x) => x) // ['', 'a', 'b', 'c', ''] => ['a', 'b', 'c']

        const category = parts[0]
        if (category !== "posts" && category !== "series")
            throw "Invalid Page Type"

        const slug = parts.slice(1) // ['a', 'b', 'c'] => ['b', 'c']

        return { category, slug }
    })
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    if (params.category != "posts" && params.category != "series")
        return notFoundMetadata

    const { pageData } = await getData(params)

    return {
        metadataBase: new URL("https://blog.developomp.com"),
        title: pageData.title,
        openGraph: {
            title: pageData.title,
        },
    }
}

export default async function Page({ params }: Props) {
    const { pageData, pageType } = await getData(params)

    return (
        <>
            <Card className="page">
                {/* next/previous series post buttons */}
                {pageType == PageType.SERIES && (
                    <SeriesControlButtons
                        seriesHome={pageData.seriesHome}
                        prevURL={pageData.prev}
                        nextURL={pageData.next}
                    />
                )}

                <h1 className="mb-4">{pageData.title}</h1>

                <small>
                    {/* Post tags */}
                    {pageData.tags.length > 0 && (
                        <TagList>
                            {pageData.tags.map((tag) => {
                                return (
                                    <div key={pageData?.title + tag}>
                                        <Tag text={tag} />
                                    </div>
                                )
                            })}
                        </TagList>
                    )}

                    <br />

                    {/* Post metadata */}
                    <Meta fetchedPage={pageData} />
                </small>

                <hr />

                {/* add table of contents if it exists */}
                <Toc data={pageData.toc} />

                {/* page content */}
                <article
                    dangerouslySetInnerHTML={{
                        __html: pageData.content,
                    }}
                />
            </Card>

            {/* series post list */}

            {pageType == PageType.SERIES_HOME &&
                pageData.order.map((post) => {
                    return (
                        <PostCard
                            key={post}
                            postData={{
                                content_id: post,
                                ...contentMap.posts[post],
                            }}
                        />
                    )
                })}
        </>
    )
}
