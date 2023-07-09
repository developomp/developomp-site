import "./Page.scss"

import type { PageData } from "@developomp-site/content/src/types/types"
import { useMeta, useTitle } from "hoofd"
import { useEffect, useState } from "react"
import { useLocation } from "wouter"

import Card from "@/components/Card"
import Loading from "@/components/Loading"
import PostCard from "@/components/PostCard"
import Tag from "@/components/Tag"
import TagList from "@/components/TagList"
import contentMap from "@/contentMap"

import NotFound from "../NotFound"
import {
    categorizePageType,
    fetchContent,
    PageType,
    parsePageData,
} from "./helper"
import Meta from "./Meta"
import SeriesControlButtons from "./SeriesControlButtons"
import Toc from "./Toc"

export default function Page() {
    const [location] = useLocation()
    const [pageData, setPageData] = useState<PageData | undefined>(undefined)
    const [pageType, setPageType] = useState<PageType>(PageType.POST)
    const [isLoading, setLoading] = useState(true)

    useTitle(pageData?.title || "Loading")
    useMeta({ property: "og:title", content: pageData?.title })

    useEffect(() => {
        setPageData(undefined)
        setLoading(true)

        const content_id = location.replace(/\/$/, "") // remove trailing slash

        fetchContent(content_id).then((fetched_content) => {
            const pageType = categorizePageType(content_id)

            // stop loading without setting pageData so 404 page will display
            if (!fetched_content || pageType === undefined) {
                setLoading(false)
                return
            }

            setPageData(parsePageData(fetched_content, pageType, content_id))
            setPageType(pageType)
            setLoading(false)
        })
    }, [location])

    if (isLoading) return <Loading />

    if (!pageData) return <NotFound />

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

                <h1 className="mb-4 leading-10">{pageData.title}</h1>

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
                    {[
                        PageType.POST,
                        PageType.SERIES,
                        PageType.SERIES_HOME,
                    ].includes(pageType) && <Meta fetchedPage={pageData} />}
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
