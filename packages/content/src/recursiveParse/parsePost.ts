import { contentMap } from ".."
import { contentDirectoryPath } from "../config"
import { generateToc } from "../parseMarkdown"
import { addDocument } from "../searchIndex"
import type { PostData } from "../types/types"
import { writeToFile } from "../util"
import type { DataToPass } from "."

export default async function parsePost(data: DataToPass): Promise<void> {
    const {
        urlPath,
        markdownRaw,
        markdownData,
        humanizedDuration,
        totalWords,
    } = data

    const postData: PostData = {
        title: markdownData.title as string,
        date: "",
        readTime: humanizedDuration,
        wordCount: totalWords,
        tags: [],
    }

    /**
     * Dates
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

    contentMap.posts[urlPath] = postData
    addDocument({
        title: markdownData.title,
        body: markdownData.content,
        url: urlPath,
    })
    writeToFile(
        `${contentDirectoryPath}${urlPath}.json`,
        JSON.stringify({
            content: markdownData.content,
            toc: await generateToc(markdownRaw),
        })
    )
}
