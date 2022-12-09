import { contentDirectoryPath } from "../config"
import { generateToc } from "../parseMarkdown"
import { PostData } from "../../types/types"
import { addDocument } from "../searchIndex"
import { writeToFile } from "../util"
import { map } from ".."
import { DataToPass } from "."

export default function parsePost(data: DataToPass): void {
	const { urlPath, markdownRaw, markdownData, humanizedDuration, totalWords } =
		data

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
	if (map.date[YYYY_MM_DD]) {
		map.date[YYYY_MM_DD].push(urlPath)
	} else {
		map.date[YYYY_MM_DD] = [urlPath]
	}

	/**
	 * Tags
	 */

	postData.tags = markdownData.tags as string[]
	if (postData.tags) {
		postData.tags.forEach((tag) => {
			if (map.tags[tag]) {
				map.tags[tag].push(urlPath)
			} else {
				map.tags[tag] = [urlPath]
			}
		})
	}

	/**
	 *
	 */

	map.posts[urlPath] = postData
	addDocument({
		title: markdownData.title,
		body: markdownData.content,
		url: urlPath,
	})
	writeToFile(
		`${contentDirectoryPath}${urlPath}.json`,
		JSON.stringify({
			content: markdownData.content,
			toc: generateToc(markdownRaw),
		})
	)
}
