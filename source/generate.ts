/**
 * Read markdown files and write their content and metadata to json files which can then be imported by React.
 * -   File and directory names starting with an underscore (_) get ignored.
 * -   Symbolic links are not supported.
 * -   The Filename-to-URL encoder is not perfect. Some non-URL-friendly filenames might cause problems.
 * - series must start with a number followed by an underscore
 */

import fs from "fs" // read and write files
import path from "path" // get relative path
import matter from "gray-matter" // parse markdown metadata
import toc from "markdown-toc" // table of contents generation

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

interface SeriesMap {
	// key: url
	[key: string]: {
		index: number
		url: string
	}[]
}

const seriesMap: SeriesMap = {}

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

// A recursive function that calls itself for every files and directories that it finds
function recursiveParsePosts(fileOrFolderPath: string) {
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
			recursiveParsePosts(`${fileOrFolderPath}/${childPath}`)
		})
	} else if (stats.isFile()) {
		// skip if it is not a markdown file
		if (!fileOrFolderName.endsWith(".md")) {
			console.log(`Ignoring non markdown file at: ${fileOrFolderPath}`)
			return
		}

		// path that will be used as site url
		const urlPath = path2URL(fileOrFolderPath)

		// parse markdown metadata
		const parsedMarkdown = matter(fs.readFileSync(fileOrFolderPath, "utf8"))

		if (!parsedMarkdown.data.title) {
			throw Error(`Title is not defined in file: ${fileOrFolderPath}`)
		}

		if (!parsedMarkdown.data.date) {
			throw Error(`Date is not defined in file: ${fileOrFolderPath}`)
		}

		// urlPath starts with a slash
		const contentFilePath = `${contentDirectoryPath}${urlPath}.json`

		// create directory to put json content files
		fs.mkdirSync(
			contentFilePath.slice(0, contentFilePath.lastIndexOf("/")),
			{ recursive: true }
		)

		// write content to json file
		fs.writeFileSync(
			contentFilePath,
			JSON.stringify({
				content: parsedMarkdown.content.trim(),
			})
		)

		// Parse data that will be written to map.js
		const postData = {
			title: parsedMarkdown.data.title,
			preview: "",
			date: "",
			tags: [],
			toc: toc(parsedMarkdown.content).content,
		}

		// content preview
		// parsedMarkdown.excerpt is intentionally not used
		// todo: fix potential improper closing of html tag
		const slicedContent = parsedMarkdown.content.split(" ")
		if (slicedContent.length > 19) {
			postData.preview = slicedContent.slice(0, 19).join(" ") + " ..."
		} else {
			postData.preview = parsedMarkdown.content
		}

		// date
		const postDate = new Date(parsedMarkdown.data.date)
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
		postData.tags = parsedMarkdown.data.tags
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
	}
}

function recursiveParseUnsearchable(fileOrFolderPath: string) {
	// get string after the last slash character
	const fileOrFolderName = path2FileOrFolderName(fileOrFolderPath)

	// ignore if file or directory name starts with a underscore
	if (fileOrFolderName.startsWith("_")) return

	// illegal names
	if (
		fileOrFolderPath == "./markdown/unsearchable/posts" ||
		fileOrFolderPath == "./markdown/unsearchable/series"
	)
		throw Error(
			`Illegal name (posts/series) in path: "${fileOrFolderPath}".`
		)

	// get data about the given path
	const stats = fs.lstatSync(fileOrFolderPath)

	// if it's a directory, call this function to every files/directories in it
	// if it's a file, parse it and then save it to file
	if (stats.isDirectory()) {
		fs.readdirSync(fileOrFolderPath).map((childPath) => {
			recursiveParseUnsearchable(`${fileOrFolderPath}/${childPath}`)
		})
	} else if (stats.isFile()) {
		// skip if it is not a markdown file
		if (!fileOrFolderName.endsWith(".md")) {
			console.log(`Ignoring non markdown file at: ${fileOrFolderPath}`)
			return
		}

		const urlPath = path2URL(fileOrFolderPath)

		// parse markdown metadata
		const parsedMarkdown = matter(fs.readFileSync(fileOrFolderPath, "utf8"))

		if (!parsedMarkdown.data.title) {
			throw Error(`Title is not defined in file: ${fileOrFolderPath}`)
		}

		// urlPath starts with a slash
		const contentFilePath = `${contentDirectoryPath}${urlPath}.json`

		// create directory to put json content files
		fs.mkdirSync(
			contentFilePath.slice(0, contentFilePath.lastIndexOf("/")),
			{ recursive: true }
		)

		// write content to json file
		fs.writeFileSync(
			contentFilePath,
			JSON.stringify({
				content: parsedMarkdown.content.trim(),
			})
		)

		// Parse data that will be written to map.js
		map.unsearchable[
			urlPath.slice(
				urlPath
					.slice(1) // ignore the first slash
					.indexOf("/") + 1
			)
		] = {
			title: parsedMarkdown.data.title,
		}
	}
}

function recursiveParseSeries(fileOrFolderPath: string) {
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
			recursiveParseSeries(`${fileOrFolderPath}/${childPath}`)
		})
	} else if (stats.isFile()) {
		// skip if it is not a markdown file
		if (!fileOrFolderName.endsWith(".md")) {
			console.log(`Ignoring non markdown file at: ${fileOrFolderPath}`)
			return
		}

		if (
			!fileOrFolderName.includes("_") &&
			!fileOrFolderName.startsWith("0")
		)
			throw Error(`Invalid series post file name at: ${fileOrFolderPath}`)

		// parse markdown metadata
		const parsedMarkdown = matter(fs.readFileSync(fileOrFolderPath, "utf8"))

		if (!parsedMarkdown.data.title) {
			throw Error(`Title is not defined in file: ${fileOrFolderPath}`)
		}

		if (!parsedMarkdown.data.date) {
			throw Error(`Date is not defined in file: ${fileOrFolderPath}`)
		}

		// path that will be used as site url
		let urlPath = path2URL(fileOrFolderPath)
		urlPath = urlPath.slice(0, urlPath.lastIndexOf("_"))
		urlPath = urlPath.replace(/\/$/, "") // remove trailing slash

		// urlPath starts with a slash
		const contentFilePath = `${contentDirectoryPath}${urlPath}.json`

		// create directory to put json content files
		fs.mkdirSync(
			contentFilePath.slice(0, contentFilePath.lastIndexOf("/")),
			{ recursive: true }
		)

		// write content to json file
		fs.writeFileSync(
			contentFilePath,
			JSON.stringify({
				content: parsedMarkdown.content.trim(),
			})
		)

		// Parse data that will be written to map.js
		const postData = {
			title: parsedMarkdown.data.title,
			preview: "",
			date: "",
			tags: [],
			toc: toc(parsedMarkdown.content).content,
		}

		// content preview
		// parsedMarkdown.excerpt is intentionally not used
		// todo: fix potential improper closing of html tag
		const slicedContent = parsedMarkdown.content.split(" ")
		if (slicedContent.length > 19) {
			postData.preview = slicedContent.slice(0, 19).join(" ") + " ..."
		} else {
			postData.preview = parsedMarkdown.content
		}

		// date
		const postDate = new Date(parsedMarkdown.data.date)
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
		postData.tags = parsedMarkdown.data.tags
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
			for (const key of Object.keys(map.series)) {
				if (urlPath.slice(0, urlPath.lastIndexOf("/")).includes(key)) {
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

recursiveParsePosts(markdownPath + "/posts")
recursiveParseUnsearchable(markdownPath + "/unsearchable")
recursiveParseSeries(markdownPath + "/series")

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

// write to src/data/map.json
fs.writeFileSync(mapFilePath, JSON.stringify(map))
