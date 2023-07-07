import type { PageData } from "@developomp-site/content/src/types/types"

import contentMap from "@/contentMap"

export enum PageType {
    POST,
    SERIES,
    SERIES_HOME,
}

export async function fetchContent(content_id: string) {
    try {
        return await import(
            `@developomp-site/content/dist/content${content_id}.json`
        )
    } catch (err) {
        return
    }
}

export function categorizePageType(content_id: string): PageType | undefined {
    if (content_id.startsWith("/post")) return PageType.POST
    if (content_id.startsWith("/series")) {
        // if the URL looks like /series/series-title (if the url has two slashes)
        if ([...(content_id.match(/\//g) || [])].length == 2)
            return PageType.SERIES_HOME

        // if the URL looks like /series/series-title/post-title (if the url does not have 2 slashes)
        return PageType.SERIES
    }
}

export function parsePageData(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fetched_content: any,
    pageType: PageType,
    content_id: string
): PageData {
    // page date to be saved as a react state
    const pageData: PageData = {
        title: "No title",
        date: "Unknown date",
        readTime: "Unknown read time",
        wordCount: 0,
        tags: [],
        toc: undefined,
        content: "No content",

        // series

        seriesHome: "",
        prev: "",
        next: "",

        // series home

        order: [],
        length: 0,

        // portfolio (unused)

        image: "",
        overview: "",
        badges: [],
        repo: "",
    }

    // load and parse content differently depending on the content type
    switch (pageType) {
        case PageType.POST: {
            const post = contentMap.posts[content_id]

            pageData.content = fetched_content.content
            pageData.toc = fetched_content.toc

            pageData.title = post.title
            pageData.date = post.date
            pageData.readTime = post.readTime
            pageData.wordCount = post.wordCount
            pageData.tags = post.tags || []

            break
        }

        case PageType.SERIES: {
            const seriesURL = content_id.slice(0, content_id.lastIndexOf("/"))

            const curr = contentMap.series[seriesURL].order.indexOf(content_id)
            const prev = curr - 1
            const next = curr + 1

            const post = contentMap.posts[content_id]

            pageData.content = fetched_content.content
            pageData.toc = fetched_content.toc

            pageData.title = post.title
            pageData.date = post.date
            pageData.readTime = post.readTime
            pageData.wordCount = post.wordCount
            pageData.tags = post.tags || []

            pageData.seriesHome = seriesURL
            pageData.prev =
                prev >= 0 ? contentMap.series[seriesURL].order[prev] : undefined
            pageData.next =
                next < contentMap.series[seriesURL].order.length
                    ? contentMap.series[seriesURL].order[next]
                    : undefined

            break
        }

        case PageType.SERIES_HOME: {
            const seriesData = contentMap.series[content_id]

            pageData.title = seriesData.title
            pageData.content = fetched_content.content

            pageData.date = seriesData.date
            pageData.readTime = seriesData.readTime
            pageData.wordCount = seriesData.wordCount
            pageData.order = seriesData.order
            pageData.length = seriesData.length

            break
        }
    }

    return pageData
}
