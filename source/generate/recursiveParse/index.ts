import fs from "fs"
import readTimeEstimate from "read-time-estimate" // post read time estimation

import { path2FileOrFolderName, path2URL } from "../util"
import { parseFrontMatter } from "../parseMarkdown"

import { ParseMode } from "../../types/types"
import parsePost from "./parsePost"
import parseSeries from "./parseSeries"
import parseUnsearchable from "./parseUnsearchable"
import parsePortfolio from "./parsePortfolio"

/**
 * Data that's passed from {@link parseFile} to other function
 */
export interface DataToPass {
	path: string
	urlPath: string
	markdownRaw: string
	markdownData: {
		content: string
		[key: string]: unknown
	}
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
		parseFile(mode, path)
	}
}

/**
 * Parse a markdown file
 *
 * @param {ParseMode} mode - decides which function to use to parse the file
 * @param {string} path - path of the markdown file
 */
function parseFile(mode: ParseMode, path: string): void {
	// stop if it is not a markdown file
	if (!path.endsWith(".md")) {
		console.log(`Ignoring non markdown file at: ${path}`)
		return
	}

	/**
	 * Parse markdown
	 */

	const markdownRaw = fs.readFileSync(path, "utf8")
	const markdownData = parseFrontMatter(markdownRaw, path, mode)
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
