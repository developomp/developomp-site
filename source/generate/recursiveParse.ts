import fs from "fs"
import readTimeEstimate from "read-time-estimate" // post read time estimation

import { path2FileOrFolderName, path2URL, writeToJSON } from "./util"
import { generateToc, parseFrontMatter } from "./parseMarkdown"

import { contentDirectoryPath } from "./config"
import { addDocument } from "./searchIndex"
import { map, seriesMap } from "."

import { MarkdownData, ParseMode, PostData } from "../types/typing"

/**
 * Data that's passed from {@link parseFile} to other function
 */
interface DataToPass {
	path: string
	urlPath: string
	markdownRaw: string
	markdownData: MarkdownData
	humanizedDuration: string
	totalWords: number
}

/**
 * A recursive function that calls itself for every files and directories that it finds
 *
 * @param {ParseMode} mode - parse mode
 * @param {string} path - path of file or folder
 */
export function recursiveParse(mode: ParseMode, path: string): void {
	// get name of the file or folder that's currently being parsed
	const fileOrFolderName = path2FileOrFolderName(path)

	// stop if the file or folder starts with a underscore
	if (fileOrFolderName.startsWith("_")) return

	const stats = fs.lstatSync(path)

	// if it's a directory, call this function to every files/directories in it
	// if it's a file, parse it and then save it to file
	if (stats.isDirectory()) {
		fs.readdirSync(path).map((childPath) => {
			recursiveParse(mode, `${path}/${childPath}`)
		})
	} else if (stats.isFile()) {
		parseFile(mode, path, fileOrFolderName)
	}
}

function parseFile(mode: ParseMode, path: string, fileName: string): void {
	// stop if it is not a markdown file
	if (!fileName.endsWith(".md")) {
		console.log(`Ignoring non markdown file at: ${path}`)
		return
	}

	/**
	 * Parse markdown
	 */

	const markdownRaw = fs.readFileSync(path, "utf8")
	const markdownData: MarkdownData = parseFrontMatter(markdownRaw, path, mode)
	const { humanizedDuration, totalWords } = readTimeEstimate(
		markdownData.content,
		275,
		12,
		500,
		["img", "Image"]
	)

	const dataToPass: DataToPass = {
		path,
		urlPath: path2URL(path),
		markdownRaw,
		markdownData,
		humanizedDuration,
		totalWords,
	}

	switch (mode) {
		case ParseMode.POSTS:
			parsePost(dataToPass)
			break

		case ParseMode.SERIES:
			parseSeries(dataToPass)
			break

		case ParseMode.UNSEARCHABLE:
			parseUnsearchable(dataToPass)
			break

		case ParseMode.PORTFOLIO:
			parsePortfolio(dataToPass)
			break
	}
}

function parsePost(data: DataToPass): void {
	const {
		urlPath,
		markdownRaw,
		markdownData,
		humanizedDuration,
		totalWords,
	} = data

	const postData: PostData = {
		title: markdownData.title,
		date: "",
		readTime: humanizedDuration,
		wordCount: totalWords,
		tags: [],
	}

	/**
	 * Dates
	 */

	const postDate = new Date(markdownData.date)
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

	postData.tags = markdownData.tags
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
	writeToJSON(
		`${contentDirectoryPath}${urlPath}.json`,
		JSON.stringify({
			content: markdownData.content,
			toc: generateToc(markdownRaw),
		})
	)
}

function parseSeries(data: DataToPass): void {
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
		title: markdownData.title,
		date: "",
		readTime: humanizedDuration,
		wordCount: totalWords,
		tags: [],
	}

	/**
	 * Date
	 */

	const postDate = new Date(markdownData.date)
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

	postData.tags = markdownData.tags
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

	writeToJSON(
		`${contentDirectoryPath}${urlPath}.json`,
		JSON.stringify({
			content: markdownData.content,
			toc: generateToc(markdownRaw),
		})
	)
}

function parseUnsearchable(data: DataToPass): void {
	const { urlPath: _urlPath, markdownData } = data

	// convert path like /XXX/YYY/ZZZ to /YYY/ZZZ
	const urlPath = _urlPath.slice(_urlPath.slice(1).indexOf("/") + 1)

	addDocument({
		title: markdownData.title,
		body: markdownData.content,
		url: urlPath,
	})

	// Parse data that will be written to map.js
	map.unsearchable[urlPath] = {
		title: markdownData.title,
	}

	/**
	 * Save content
	 */

	writeToJSON(
		`${contentDirectoryPath}/unsearchable${urlPath}.json`,
		JSON.stringify({
			content: markdownData.content,
		})
	)
}

function parsePortfolio(data: DataToPass): void {
	console.log("portfolio file:", data.path)
}
