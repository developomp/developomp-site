import RSS from "rss"

import type { ContentMap } from "./types/types"

export function buildFeed(contentMap: ContentMap): string {
    /* lets create an rss feed */
    const feed = new RSS({
        title: "pomp's blog",
        description: "developomp's blog",
        feed_url: "https://blog.developomp.com/rss.xml",
        site_url: "https://blog.developomp.com",
        image_url: "https://blog.developomp.com/favicon.svg",
        language: "en",
        pubDate: "May 20, 2012 04:00:00 GMT",
    })

    for (const key in contentMap.posts)
        feed.item({
            title: contentMap.posts[key].title,
            description: contentMap.posts[key].title,
            url: `https://blog.developomp.com${key}`,
            date: contentMap.posts[key].date,
        })

    return feed.xml()
}
