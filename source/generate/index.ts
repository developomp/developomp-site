/**
 * @file Read markdown files and write their content and metadata to json files which can then be imported by React.
 * -   File and directory names starting with an underscore (_) are ignored.
 * -   Symbolic links are not supported.
 * -   The filename-to-URL converter isn't perfect. Some non-URL-friendly filenames might cause problems.
 * -   series must start with a number followed by an underscore
 */

import fs from "fs"

import { recursiveParse } from "./recursiveParse"
import { contentDirectoryPath, mapFilePath, markdownPath } from "./config"
import { saveIndex } from "./searchIndex"

import { Map, ParseMode, SeriesMap } from "../types/typing"

// searchable data that will be converted to JSON string
export const map: Map = {
	date: {},
	tags: {},
	meta: {
		tags: [],
	},
	posts: {},
	series: {},
	unsearchable: {},
}
export const seriesMap: SeriesMap = {}

/**
 * Delete existing files
 */

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

recursiveParse(ParseMode.POSTS, markdownPath + "/posts")
recursiveParse(ParseMode.UNSEARCHABLE, markdownPath + "/unsearchable")
recursiveParse(ParseMode.SERIES, markdownPath + "/series")

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
saveIndex()
