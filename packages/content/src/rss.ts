import RSS from "rss"

import type { ContentMap } from "./types/types"

export function buildFeed(contentMap: ContentMap): string {
    /* lets create an rss feed */
    const feed = new RSS({
        title: "pomp's blog",
        description: "pomp's blog",
        feed_url: "https://blog.pompy.dev/rss.xml",
        site_url: "https://blog.pompy.dev",
        image_url: "https://blog.pompy.dev/favicon.svg",
        language: "en",
        pubDate: "May 20, 2012 04:00:00 GMT",
    })

    for (const key in contentMap.posts)
        feed.item({
            title: contentMap.posts[key].title,
            description: contentMap.posts[key].title,
            url: `https://blog.pompy.dev${key}`,
            date: contentMap.posts[key].date,
        })

    return feed.xml()
}
