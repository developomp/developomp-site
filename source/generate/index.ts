/**
 * @file Read markdown files and write their content and metadata to json files which can then be imported by React.
 * -   File and directory names starting with an underscore (_) are ignored.
 * -   Symbolic links are not supported.
 * -   The filename-to-URL converter isn't perfect. Some non-URL-friendly filenames might cause problems.
 * -   series must start with a number followed by an underscore
 */

import fs from "fs"

import { contentDirectoryPath, mapFilePath, markdownPath } from "./config"
import { recursiveParse } from "./recursiveParse"
import { saveIndex } from "./searchIndex"

import { Map, ParseMode, SeriesMap, PortfolioData } from "../types/typing"

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
export const portfolioData: PortfolioData = {
	overview: "",
	projects: [],
}

/**
 * Delete previously generated files
 */

try {
	fs.rmSync(contentDirectoryPath, { recursive: true })
	// eslint-disable-next-line no-empty
} catch (err) {}

try {
	fs.unlinkSync(mapFilePath)
	// eslint-disable-next-line no-empty
} catch (err) {}

/**
 * Checking
 */

if (!fs.lstatSync(markdownPath).isDirectory())
	throw Error("Invalid markdown path")

if (!fs.lstatSync(markdownPath + "/posts").isDirectory())
	throw Error(`Cannot find directory: ${markdownPath + "/posts"}`)

if (!fs.lstatSync(markdownPath + "/unsearchable").isDirectory())
	throw Error(`Cannot find directory: ${markdownPath + "/posts"}`)

if (!fs.lstatSync(markdownPath + "/series").isDirectory())
	throw Error(`Cannot find directory: ${markdownPath + "/posts"}`)

/**
 * Parse
 */

recursiveParse(ParseMode.POSTS, markdownPath + "/posts")
recursiveParse(ParseMode.UNSEARCHABLE, markdownPath + "/unsearchable")
recursiveParse(ParseMode.SERIES, markdownPath + "/series")

/**
 * Post-process
 */

// sort date

const TmpDate = map.date
map.date = {}
Object.keys(map.date)
	.sort()
	.forEach((sortedDateKey) => {
		map.date[sortedDateKey] = TmpDate[sortedDateKey]
	})

// fill meta data

map.meta.tags = Object.keys(map.tags)

// sort series post

for (const seriesURL in seriesMap) {
	seriesMap[seriesURL].sort((a, b) => {
		if (a.index < b.index) return -1
		if (a.index > b.index) return 1

		return 0
	})
}

for (const seriesURL in seriesMap) {
	map.series[seriesURL].length = seriesMap[seriesURL].length
	map.series[seriesURL].order = seriesMap[seriesURL].map((item) => item.url)
}

/**
 * Save results
 */

fs.writeFileSync(mapFilePath, JSON.stringify(map))
saveIndex()
