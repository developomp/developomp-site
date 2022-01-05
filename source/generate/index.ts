/**
 * @file Read markdown files and write their content and metadata to json files which can then be imported by React.
 * -   File and directory names starting with an underscore (_) are ignored.
 * -   Symbolic links are not supported.
 * -   The filename-to-URL converter isn't perfect. Some non-URL-friendly filenames might cause problems.
 * -   series must start with a number followed by an underscore
 */

import fs from "fs"

import { mapFilePath, markdownPath, portfolioFilePath } from "./config"
import { recursiveParse } from "./recursiveParse"
import { saveIndex } from "./searchIndex"
import postProcess from "./postProcess"
import clean from "./clean"

import { Map, ParseMode, SeriesMap, PortfolioData } from "../types/types"

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
	projects: {},
}

/**
 * Delete previously generated files
 */

clean()

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
recursiveParse(ParseMode.PORTFOLIO, markdownPath + "/portfolio")

/**
 * Post-process
 */

postProcess()

/**
 * Save results
 */

fs.writeFileSync(mapFilePath, JSON.stringify(map))
fs.writeFileSync(portfolioFilePath, JSON.stringify(portfolioData))
saveIndex()
