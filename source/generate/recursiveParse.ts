import fs from "fs"
import readTimeEstimate from "read-time-estimate" // post read time estimation
import matter from "gray-matter" // parse markdown metadata
import toc from "markdown-toc" // table of contents generation
import { JSDOM } from "jsdom" // HTML DOM parsing

import { nthIndex, path2FileOrFolderName, path2URL, writeToJSON } from "./util"
import { parseMarkdown } from "./parseMarkdown"

import { contentDirectoryPath } from "./config"
import { addDocument } from "./searchIndex"
import { map, seriesMap } from "."

// A recursive function that calls itself for every files and directories that it finds
export function recursiveParse(
	mode: "posts" | "series" | "unsearchable",
	fileOrFolderPath: string
) {
	if (mode == "unsearchable") {
		// illegal names
		if (
			fileOrFolderPath == "./markdown/unsearchable/posts" ||
			fileOrFolderPath == "./markdown/unsearchable/series"
		)
			throw Error(
				`Illegal name (posts/series) in path: "${fileOrFolderPath}".`
			)
	}

	// get string after the last slash character
	const fileOrFolderName = path2FileOrFolderName(fileOrFolderPath)

	// ignore if file or directory name starts with a underscore
	if (fileOrFolderName.startsWith("_")) return

	// get data about the given path
	const stats = fs.lstatSync(fileOrFolderPath)

	// if it's a directory, call this function to every files/directories in it
	// if it's a file, parse it and then save it to file
	if (stats.isDirectory()) {
		fs.readdirSync(fileOrFolderPath).map((childPath) => {
			recursiveParse(mode, `${fileOrFolderPath}/${childPath}`)
		})
	} else if (stats.isFile()) {
		// skip if it is not a markdown file
		if (!fileOrFolderName.endsWith(".md")) {
			console.log(`Ignoring non markdown file at: ${fileOrFolderPath}`)
			return
		}

		// read markdown file
		const markdownRaw = fs.readFileSync(fileOrFolderPath, "utf8")

		// parse markdown metadata
		const markdownData = matter(
			markdownRaw.slice(0, nthIndex(markdownRaw, "---", 2) + 3)
		).data

		if (!markdownData.title)
			throw Error(`Title is not defined in file: ${fileOrFolderPath}`)

		const dom = new JSDOM(parseMarkdown(markdownRaw))

		// add .hljs to all block codes
		dom.window.document.querySelectorAll("pre > code").forEach((item) => {
			item.classList.add("hljs")
		})

		markdownData.content = dom.window.document.documentElement.innerHTML

		// https://github.com/pritishvaidya/read-time-estimate
		const { humanizedDuration, totalWords } = readTimeEstimate(
			markdownData.content,
			275,
			12,
			500,
			["img", "Image"]
		)

		if (mode == "posts") {
			if (!markdownData.date) {
				throw Error(`Date is not defined in file: ${fileOrFolderPath}`)
			}

			// path that will be used as site url (starts with a slash)
			const urlPath = path2URL(fileOrFolderPath)

			writeToJSON(
				`${contentDirectoryPath}${urlPath}.json`,
				JSON.stringify({
					content: markdownData.content,
					toc: toc(markdownRaw).json,
				})
			)

			// Parse data that will be written to map.js
			const postData = {
				title: markdownData.title,
				preview: "",
				date: "",
				readTime: humanizedDuration,
				wordCount: totalWords,
				tags: [],
			}

			// content preview
			// parsedMarkdown.excerpt is intentionally not used
			// todo: fix potential improper closing of html tag
			const slicedContent = markdownData.content.split(" ")
			if (slicedContent.length > 19) {
				postData.preview = slicedContent.slice(0, 19).join(" ") + " ..."
			} else {
				postData.preview = markdownData.content
			}

			// date
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

			//tags
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

			map.posts[urlPath] = postData
			addDocument({
				title: markdownData.title,
				body: markdownData.content,
				url: urlPath,
			})
		} else if (mode == "unsearchable") {
			// path that will be used as site url (starts with a slash)
			const _urlPath = path2URL(fileOrFolderPath)
			const urlPath = _urlPath.slice(
				_urlPath
					.slice(1) // ignore the first slash
					.indexOf("/") + 1
			)

			writeToJSON(
				`${contentDirectoryPath}/unsearchable${urlPath}.json`,
				JSON.stringify({
					content: markdownData.content,
				})
			)

			// Parse data that will be written to map.js
			map.unsearchable[urlPath] = {
				title: markdownData.title,
			}

			addDocument({
				title: markdownData.title,
				body: markdownData.content,
				url: urlPath,
			})
		} else if (mode == "series") {
			if (
				!fileOrFolderName.includes("_") &&
				!fileOrFolderName.startsWith("0")
			)
				throw Error(
					`Invalid series post file name at: ${fileOrFolderPath}`
				)

			if (!markdownData.date) {
				throw Error(`Date is not defined in file: ${fileOrFolderPath}`)
			}

			// path that will be used as site url (starts with a slash)
			let urlPath = path2URL(fileOrFolderPath)
			urlPath = urlPath.slice(0, urlPath.lastIndexOf("_"))
			urlPath = urlPath.replace(/\/$/, "") // remove trailing slash

			writeToJSON(
				`${contentDirectoryPath}${urlPath}.json`,
				JSON.stringify({
					content: markdownData.content,
					toc: toc(markdownRaw).json,
				})
			)

			// Parse data that will be written to map.js
			const postData = {
				title: markdownData.title,
				preview: "",
				date: "",
				readTime: humanizedDuration,
				wordCount: totalWords,
				tags: [],
			}

			// content preview
			// parsedMarkdown.excerpt is intentionally not used
			// todo: fix potential improper closing of html tag
			const slicedContent = markdownData.content.split(" ")
			if (slicedContent.length > 19) {
				postData.preview = slicedContent.slice(0, 19).join(" ") + " ..."
			} else {
				postData.preview = markdownData.content
			}

			// date
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

			//tags
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

			if (fileOrFolderName.startsWith("0")) {
				map.series[urlPath] = { ...postData, order: [], length: 0 }
			} else {
				map.posts[urlPath] = postData
				addDocument({
					title: markdownData.title,
					body: markdownData.content,
					url: urlPath,
				})
				for (const key of Object.keys(map.series)) {
					if (
						urlPath.slice(0, urlPath.lastIndexOf("/")).includes(key)
					) {
						const index = parseInt(
							fileOrFolderName.slice(
								0,
								fileOrFolderName.lastIndexOf("_")
							)
						)

						if (isNaN(index)) {
							throw Error(
								`Invalid series index at: ${fileOrFolderPath}`
							)
						}

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
		}
	}
}
