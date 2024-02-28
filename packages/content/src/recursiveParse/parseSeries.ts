import { contentMap, seriesMap } from ".."
import { contentDirectoryPath } from "../config"
import { generateToc } from "../parseMarkdown"
import { addDocument } from "../searchIndex"
import type { PostData } from "../types/types"
import { writeToFile } from "../util"
import type { DataToPass } from "."

export default async function parseSeries(data: DataToPass): Promise<void> {
    const {
        path,
        urlPath: _urlPath,
        markdownRaw,
        markdownData,
        humanizedDuration,
        totalWords,
    } = data

    // last part of the url without the slash
    let lastPath = _urlPath.slice(_urlPath.lastIndexOf("/") + 1)
    if (!lastPath.includes("_") && !lastPath.startsWith("0"))
        throw Error(`Invalid series file name at: "${path}"`)

    // if file is a series descriptor or not (not = regular series post)
    const isFileDescriptor = lastPath.startsWith("0") && !lastPath.includes("_")

    // series post url
    if (isFileDescriptor) {
        lastPath = ""
    } else {
        lastPath = lastPath
            .slice(lastPath.indexOf("_") + 1) // get string after the series index
            .replace(/\/$/, "") // remove trailing slash
    }

    // get url until right before the lastPath
    const urlUntilLastPath = _urlPath.slice(0, _urlPath.lastIndexOf("/") + 1)

    // remove trailing slash if it's a regular series post
    const urlPath =
        (isFileDescriptor
            ? urlUntilLastPath.replace(/\/$/, "")
            : urlUntilLastPath) + lastPath

    // todo: separate interface for series descriptor (no word count and read time)
    const postData: PostData = {
        title: markdownData.title as string,
        date: "",
        readTime: humanizedDuration,
        wordCount: totalWords,
        tags: [],
    }

    /**
     * Date
     */

    const postDate = new Date(markdownData.date as string)
    postData.date = postDate.toLocaleString("default", {
        month: "short",
        day: "numeric",
        year: "numeric",
    })

    const YYYY_MM_DD = postDate.toISOString().split("T")[0]
    if (contentMap.date[YYYY_MM_DD]) {
        contentMap.date[YYYY_MM_DD].push(urlPath)
    } else {
        contentMap.date[YYYY_MM_DD] = [urlPath]
    }

    /**
     * Tags
     */

    postData.tags = markdownData.tags as string[]
    if (postData.tags) {
        postData.tags.forEach((tag) => {
            if (contentMap.tags[tag]) {
                contentMap.tags[tag].push(urlPath)
            } else {
                contentMap.tags[tag] = [urlPath]
            }
        })
    }

    /**
     *
     */

    addDocument({
        title: markdownData.title,
        body: markdownData.content,
        url: urlPath,
    })

    contentMap.posts[urlPath] = postData

    // series markdown starting with 0 is a series descriptor
    if (isFileDescriptor) {
        contentMap.series[urlPath] = {
            ...postData,
            order: [],
            length: 0,
        }
    } else {
        // put series post in appropriate series
        for (const key of Object.keys(contentMap.series)) {
            if (urlPath.includes(key)) {
                const index = parseInt(
                    _urlPath.slice(
                        _urlPath.lastIndexOf("/") + 1,
                        _urlPath.lastIndexOf("_"),
                    ),
                )

                if (isNaN(index))
                    throw Error(`Invalid series index at: ${path}`)

                const itemToPush = {
                    index: index,
                    url: urlPath,
                }

                if (seriesMap[key]) {
                    seriesMap[key].push(itemToPush)
                } else {
                    seriesMap[key] = [itemToPush]
                }

                break
            }
        }
    }

    /**
     * Save content
     */

    writeToFile(
        `${contentDirectoryPath}${urlPath}.json`,
        JSON.stringify({
            content: markdownData.content,
            toc: await generateToc(markdownRaw),
        }),
    )
}
