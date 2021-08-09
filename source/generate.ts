/**
 * Read markdown files and write their content and metadata to json files which can then be imported by React.
 * -   File and directory names starting with an underscore (_) get ignored.
 * -   Symbolic links are not supported.
 * -   The Filename-to-URL encoder is not perfect. Some non-URL-friendly filenames might cause problems.
 * - series must start with a number followed by an underscore
 */

import fs from "fs" // read and write files
import path from "path" // get relative path
import elasticlunr from "elasticlunr" // search index generation
import matter from "gray-matter" // parse markdown metadata
import markdownIt from "markdown-it" // rendering markdown
import hljs from "highlight.js" // code block highlighting
import toc from "markdown-toc" // table of contents generation
import tm from "markdown-it-texmath" // rendering mathematical expression
import katex from "katex" // rendering mathematical expression

const markdownPath = "./markdown" // where it will look for markdown documents
const outPath = "./src/data" // path to the json database

const contentDirectoryPath = `${outPath}/content`
const mapFilePath = `${outPath}/map.json`

interface Map {
	// key: YYYY-MM-DD
	// value: url
	date: {
		[key: string]: string[]
	}

	// key: tag name
	// value: url
	tags: {
		[key: string]: string[]
	}

	// list of all meta data
	meta: {
		tags: string[]
	}

	// searchable, non-series posts
	// must have a post date
	// tag is not required
	posts: {
		[key: string]: {
			title: string
			date: string
			tags: string[]
			toc: string
			preview: string
		}
	}

	// series posts have "previous post" and "next post" button so they need to be ordered
	series: {
		[key: string]: {
			title: string
			toc: string // in series home page and ≡ (3 horizontal line) button
			length: number
			order: string[] // url order
			tags: string[]
		}
	}

	// urls of unsearchable posts
	// it is here to quickly check if a post exists or not
	unsearchable: {
		[key: string]: {
			title: string
		}
	}
}

interface SeriesMap {
	// key: url
	[key: string]: {
		index: number
		url: string
	}[]
}

// searchable data that will be converted to JSON string
const map: Map = {
	date: {},
	tags: {},
	meta: {
		tags: [],
	},
	posts: {},
	series: {},
	unsearchable: {},
}
const seriesMap: SeriesMap = {}
const index = elasticlunr(function () {
	this.addField("title" as never)
	this.addField("body" as never)
	this.setRef("url" as never)
})

const md = markdownIt({
	highlight: function (str, lang) {
		if (lang && hljs.getLanguage(lang)) {
			try {
				return hljs.highlight(str, { language: lang }).value
				// eslint-disable-next-line no-empty
			} catch (error) {}
		}

		return "" // use external default escaping
	},
	html: true,
}).use(tm, {
	engine: katex,
	delimiters: "dollars",
	katexOptions: { macros: { "\\RR": "\\mathbb{R}" } },
})

// converts file path to url
function path2URL(pathToConvert: string): string {
	return `/${path.relative(markdownPath, pathToConvert)}`
		.replace(/\.[^/.]+$/, "") // remove the file extension
		.replace(/ /g, "-") // replace all space with a dash
}

// gets the text after the last slash
function path2FileOrFolderName(inputPath: string): string {
	// remove trailing slash
	if (inputPath[-1] == "/")
		inputPath = inputPath.slice(0, inputPath.length - 1)

	// get the last section
	return inputPath.slice(inputPath.lastIndexOf("/") + 1)
}

// gets the nth occurance of a pattern in string
// returns -1 if nothing is found
// https://stackoverflow.com/a/14482123/12979111
function nthIndex(str: string, pat: string, n: number) {
	let i = -1

	while (n-- && i++ < str.length) {
		i = str.indexOf(pat, i)
		if (i < 0) break
	}

	return i
}

function writeToJSON(JSONFilePath: string, dataToWrite: string) {
	// create directory to put json content files
	fs.mkdirSync(JSONFilePath.slice(0, JSONFilePath.lastIndexOf("/")), {
		recursive: true,
	})

	// write content to json file
	fs.writeFileSync(
		JSONFilePath,
		JSON.stringify({
			content: dataToWrite.trim(),
		})
	)
}

// A recursive function that calls itself for every files and directories that it finds
function recursiveParse(
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

		markdownData.content =
			md.render(markdownRaw.slice(nthIndex(markdownRaw, "---", 2) + 3)) ||
			""

		if (mode == "posts") {
			if (!markdownData.date) {
				throw Error(`Date is not defined in file: ${fileOrFolderPath}`)
			}

			// path that will be used as site url (starts with a slash)
			const urlPath = path2URL(fileOrFolderPath)

			writeToJSON(
				`${contentDirectoryPath}${urlPath}.json`,
				markdownData.content
			)

			// Parse data that will be written to map.js
			const postData = {
				title: markdownData.title,
				preview: "",
				date: "",
				tags: [],
				toc: toc(markdownRaw).content,
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
			index.addDoc({
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
				markdownData.content
			)

			// Parse data that will be written to map.js
			map.unsearchable[urlPath] = {
				title: markdownData.title,
			}

			index.addDoc({
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
				markdownData.content
			)

			// Parse data that will be written to map.js
			const postData = {
				title: markdownData.title,
				preview: "",
				date: "",
				tags: [],
				toc: toc(markdownData.content).content,
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
				index.addDoc({
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

// Delete existing files

try {
	fs.rmSync(contentDirectoryPath, { recursive: true })
	// eslint-disable-next-line no-empty
} catch (err) {}

try {
	fs.unlinkSync(mapFilePath)
	// eslint-disable-next-line no-empty
} catch (err) {}

// check if it's a directory and start recursive parse function
if (!fs.lstatSync(markdownPath).isDirectory())
	throw Error("Invalid markdown path")

if (!fs.lstatSync(markdownPath + "/posts").isDirectory())
	throw Error(`Cannot find directory: ${markdownPath + "/posts"}`)

if (!fs.lstatSync(markdownPath + "/unsearchable").isDirectory())
	throw Error(`Cannot find directory: ${markdownPath + "/posts"}`)

if (!fs.lstatSync(markdownPath + "/series").isDirectory())
	throw Error(`Cannot find directory: ${markdownPath + "/posts"}`)

recursiveParse("posts", markdownPath + "/posts")
recursiveParse("unsearchable", markdownPath + "/unsearchable")
recursiveParse("series", markdownPath + "/series")

// sort dates
let dateKeys: string[] = []
for (const dateKey in map.date) {
	dateKeys.push(dateKey)
}

dateKeys = dateKeys.sort()

const TmpDate = map.date
map.date = {}

dateKeys.forEach((sortedDateKey) => {
	map.date[sortedDateKey] = TmpDate[sortedDateKey]
})

// fill meta data
for (const tag in map.tags) {
	map.meta.tags.push(tag)
}

// sort series post
for (const seriesURL in seriesMap) {
	seriesMap[seriesURL].sort((a, b) => {
		if (a.index < b.index) {
			return -1
		}
		if (a.index > b.index) {
			return 1
		}
		return 0
	})
}

for (const seriesURL in seriesMap) {
	map.series[seriesURL].length = seriesMap[seriesURL].length
	map.series[seriesURL].order = seriesMap[seriesURL].map((item) => item.url)
}

fs.writeFileSync(mapFilePath, JSON.stringify(map))
fs.writeFileSync(outPath + "/search.json", JSON.stringify(index))
