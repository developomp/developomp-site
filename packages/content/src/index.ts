/**
 * @file Read markdown files and write their content and metadata to json files which can then be imported by React.
 * -   File and directory names starting with an underscore (_) are ignored.
 * -   Symbolic links are not supported.
 * -   The filename-to-URL converter isn't perfect. Some non-URL-friendly filenames might cause problems.
 * -   series must start with a number followed by an underscore
 */

import fs from "fs"

import { mapFilePath, markdownPath, outPath, rssFilePath } from "./config"
import { fillTags, parseSeries, sortDates } from "./postProcess"
import { recursiveParse } from "./recursiveParse"
import { buildFeed } from "./rss"
import { saveIndex } from "./searchIndex"
import type { ContentMap, SeriesMap } from "./types/types"
import { ParseMode } from "./types/types"

export const contentMap: ContentMap = {
    date: {},
    tags: {},
    meta: {
        tags: [],
    },
    posts: {},
    series: {},
}
export const seriesMap: SeriesMap = {}

async function main() {
    /**
     * Delete previously generated files
     */

    try {
        fs.rmSync(outPath, { recursive: true })
        // eslint-disable-next-line no-empty
    } catch (err) {}

    /**
     * Checking
     */

    if (!fs.lstatSync(markdownPath).isDirectory())
        throw Error("Invalid markdown path")

    if (!fs.lstatSync(markdownPath + "/posts").isDirectory())
        throw Error(`Cannot find directory: ${markdownPath + "/posts"}`)

    if (!fs.lstatSync(markdownPath + "/series").isDirectory())
        throw Error(`Cannot find directory: ${markdownPath + "/posts"}`)

    /**
     * Parse
     */

    // parse markdown
    await recursiveParse(ParseMode.POSTS, markdownPath + "/posts")
    await recursiveParse(ParseMode.SERIES, markdownPath + "/series")

    sortDates()
    fillTags()
    parseSeries()

    /**
     * Save results
     */

    fs.writeFileSync(mapFilePath, JSON.stringify(contentMap))
    fs.writeFileSync(rssFilePath, buildFeed(contentMap))
    saveIndex()
}

main()
