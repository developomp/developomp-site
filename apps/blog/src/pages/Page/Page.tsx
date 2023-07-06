import type { PageData } from "@developomp-site/content/src/types/types"
import { useMeta, useTitle } from "hoofd"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import styled from "styled-components"

import Loading from "../../components/Loading"
import MainContent from "../../components/MainContent"
import PostCard from "../../components/PostCard"
import Tag from "../../components/Tag"
import TagList from "../../components/TagList"
import contentMap from "../../contentMap"
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

const StyledTitle = styled.h1`
    margin-bottom: 1rem;
    line-height: 2.5rem;

    word-wrap: break-word;
`

export default function Page() {
    const { pathname } = useLocation()

    const [pageData, setPageData] = useState<PageData | undefined>(undefined)
    const [pageType, setPageType] = useState<PageType>(PageType.POST)
    const [isLoading, setIsLoading] = useState(true)

    useTitle(pageData?.title || "Loading")
    useMeta({ property: "og:title", content: pageData?.title })

    // this code runs if either the url or the locale changes
    useEffect(() => {
        const content_id = pathname.replace(/\/$/, "") // remove trailing slash
        const pageType = categorizePageType(content_id)

        fetchContent(pageType, content_id).then((fetched_content) => {
            if (!fetched_content) {
                // stop loading without fetching pageData so 404 page will display
                setIsLoading(false)

                return
            }

            setPageData(parsePageData(fetched_content, pageType, content_id))
            setPageType(pageType)
            setIsLoading(false)
        })
    }, [pathname])

    if (isLoading) return <Loading />

    if (!pageData) return <NotFound />

    return (
        <>
            <MainContent>
                {/* next/previous series post buttons */}
                {pageType == PageType.SERIES && (
                    <SeriesControlButtons
                        seriesHome={pageData.seriesHome}
                        prevURL={pageData.prev}
                        nextURL={pageData.next}
                    />
                )}

                <StyledTitle>{pageData.title}</StyledTitle>

                <small>
                    {/* Post tags */}
                    {pageData.tags.length > 0 && (
                        <TagList direction="left">
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
                <div
                    dangerouslySetInnerHTML={{
                        __html: pageData.content,
                    }}
                />
            </MainContent>

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
