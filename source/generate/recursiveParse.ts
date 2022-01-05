import fs from "fs"
import readTimeEstimate from "read-time-estimate" // post read time estimation
import matter from "gray-matter" // parse markdown metadata
import { JSDOM } from "jsdom" // HTML DOM parsing

import { nthIndex, path2FileOrFolderName, path2URL, writeToJSON } from "./util"
import parseMarkdown, { generateToc } from "./parseMarkdown"

import { contentDirectoryPath } from "./config"
import { addDocument } from "./searchIndex"
import { map, seriesMap } from "."

import { MarkdownData, ParseMode, PostData } from "../types/typing"

interface DataToPass {
	path: string
	urlPath: string
	fileOrFolderName: string
	markdownRaw: string
	markdownData: MarkdownData
	humanizedDuration: string
	totalWords: number
}

/**
 * A recursive function that calls itself for every files and directories that it finds
 *
 * @param {ParseMode} mode
 * @param {string} path - path of file or folder
 *
 * @returns {void}
 */
export function recursiveParse(mode: ParseMode, path: string): void {
	const fileOrFolderName = path2FileOrFolderName(path)
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

function parseFile(
	mode: ParseMode,
	path: string,
	fileOrFolderName: string
): void {
	// skip if it is not a markdown file
	if (!fileOrFolderName.endsWith(".md")) {
		console.log(`Ignoring non markdown file at: ${path}`)
		return
	}

	const markdownRaw = fs.readFileSync(path, "utf8")
	const markdownData: MarkdownData = parseFrontMatter(markdownRaw, path, mode)

	// https://github.com/pritishvaidya/read-time-estimate
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
		fileOrFolderName,
		markdownRaw,
		markdownData,
		humanizedDuration,
		totalWords,
	}

	switch (mode) {
		case ParseMode.POSTS: {
			parsePost(dataToPass)
			break
		}

		case ParseMode.UNSEARCHABLE: {
			dataToPass.urlPath = dataToPass.urlPath.slice(
				dataToPass.urlPath
					.slice(1) // ignore the first slash
					.indexOf("/") + 1
			)

			parseUnsearchable(dataToPass)
			break
		}

		case ParseMode.SERIES: {
			let urlPath = dataToPass.urlPath
			urlPath = urlPath.slice(0, urlPath.lastIndexOf("_"))
			dataToPass.urlPath = urlPath.replace(/\/$/, "") // remove trailing slash

			parseSeries(dataToPass)
			break
		}
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
		urlPath,
		fileOrFolderName,
		markdownRaw,
		markdownData,
		humanizedDuration,
		totalWords,
	} = data

	if (!fileOrFolderName.includes("_") && !fileOrFolderName.startsWith("0"))
		throw Error(`Invalid series post file name at: ${path}`)

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

	// series markdown starting with 0 is a series descriptor
	if (fileOrFolderName.startsWith("0")) {
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

		for (const key of Object.keys(map.series)) {
			if (urlPath.slice(0, urlPath.lastIndexOf("/")).includes(key)) {
				const index = parseInt(
					fileOrFolderName.slice(0, fileOrFolderName.lastIndexOf("_"))
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
	 *
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
	const { urlPath, markdownData } = data

	addDocument({
		title: markdownData.title,
		body: markdownData.content,
		url: urlPath,
	})

	// Parse data that will be written to map.js
	map.unsearchable[urlPath] = {
		title: markdownData.title,
	}

	writeToJSON(
		`${contentDirectoryPath}/unsearchable${urlPath}.json`,
		JSON.stringify({
			content: markdownData.content,
		})
	)
}

/**
 * todo: accurately calculate start and end of front matter
 *
 * @param {string} markdownRaw
 * @param {string} path
 *
 * @returns {MarkdownData}
 */
function parseFrontMatter(
	markdownRaw: string,
	path: string,
	mode: ParseMode
): MarkdownData {
	const result = matter(
		markdownRaw.slice(0, nthIndex(markdownRaw, "---", 2) + 3)
	).data

	if (!result.title) throw Error(`Title is not defined in file: ${path}`)

	if (mode != ParseMode.UNSEARCHABLE && !result.date)
		throw Error(`Date is not defined in file: ${path}`)

	const dom = new JSDOM(parseMarkdown(markdownRaw))

	// add .hljs class to all block codes
	dom.window.document.querySelectorAll("pre > code").forEach((item) => {
		item.classList.add("hljs")
	})

	result.content = dom.window.document.documentElement.innerHTML

	return result as MarkdownData
}
