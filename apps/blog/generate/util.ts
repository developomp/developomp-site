import fs from "fs"
import { relative } from "path"

import { markdownPath } from "./config"

/**
 * converts file path to url path that will be used in the url (starts with a slash)
 *
 * @param {string} pathToConvert
 */
export function path2URL(pathToConvert: string): string {
	return `/${relative(markdownPath, pathToConvert)}`
		.replace(/\.[^/.]+$/, "") // remove the file extension
		.replace(/ /g, "-") // replace all space with a dash
}

/**
 * Returns the text after the last slash
 *
 * @param {string} inputPath - path to parse
 */
export function path2FileOrFolderName(inputPath: string): string {
	// remove trailing slash
	if (inputPath[-1] == "/") inputPath = inputPath.slice(0, inputPath.length - 1)

	// get the last section
	return inputPath.slice(inputPath.lastIndexOf("/") + 1)
}

// gets the nth occurance of a pattern in string
// returns -1 if nothing is found
// https://stackoverflow.com/a/14482123/12979111
export function nthIndex(str: string, pat: string, n: number) {
	let i = -1

	while (n-- && i++ < str.length) {
		i = str.indexOf(pat, i)
		if (i < 0) break
	}

	return i
}

export function writeToFile(filePath: string, dataToWrite: string) {
	// create directory to put the files
	fs.mkdirSync(filePath.slice(0, filePath.lastIndexOf("/")), {
		recursive: true,
	})

	// write content to the file
	fs.writeFileSync(filePath, dataToWrite)
}
