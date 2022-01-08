import { contentDirectoryPath } from "../config"
import { generateToc } from "../parseMarkdown"
import { PostData } from "../../types/types"
import { addDocument } from "../searchIndex"
import { writeToFile } from "../util"
import { map, seriesMap } from ".."
import { DataToPass } from "."

export default function parseSeries(data: DataToPass): void {
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
		throw Error(`Invalid series file name at: ${path}`)

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

	// series markdown starting with 0 is a series descriptor
	if (isFileDescriptor) {
		map.series[urlPath] = {
			...postData,
			order: [],
			length: 0,
		}
	} else {
		addDocument({
			title: markdownData.title,
			body: markdownData.content,
			url: urlPath,
		})

		map.posts[urlPath] = postData

		// put series post in appropriate series
		for (const key of Object.keys(map.series)) {
			if (urlPath.includes(key)) {
				const index = parseInt(
					_urlPath.slice(
						_urlPath.lastIndexOf("/") + 1,
						_urlPath.lastIndexOf("_")
					)
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
			toc: generateToc(markdownRaw),
		})
	)
}
