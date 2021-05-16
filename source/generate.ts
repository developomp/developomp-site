/** generator.ts
 * It reads markdown files and write its content and metadata to a json file that can be used by React.
 * -   Files and directories names starting with a underscore (_ <- this thing), will be ignored
 * -   Symbolic links are also be ignored as of the moment
 * -   Filename-to-url encoder not perfect. Some filenames might cause problem (like files containing special characters)
 */

import fs from "fs" // read and write files
import path from "path" // get relative path
import matter from "gray-matter" // parse markdown metadata
// import createDOMPurify from "dompurify" // sanitize result html
// import { JSDOM } from "jsdom" // create empty window for fom purifier to work. Morea info here: https://github.com/cure53/DOMPurify
import toc from "markdown-toc" // table of contents generation

// const window = new JSDOM("").window
// const DOMPurify = createDOMPurify(window)

const dirPath = "./markdown" // where it will look for markdown documents
const outPath = "./src/pages.json" // path to the json database

const removeExceptionArray = ["content", "meta"] // gray-matter creates unnecessary properties

const pageList = {} // data that will be converted to JSON string

// big brain recursive function
// only supports folders and files (no symbolic links)
// does not scale well for large amount of folders and files
function addFiles(filesPath: string) {
	// ignore if file/directory name starts with a underscore
	const fileOrFolderName = filesPath.substring(filesPath.lastIndexOf("/") + 1)
	if (fileOrFolderName.startsWith("_")) return

	// not perfect. Some filenames might cause problem.
	const stats = fs.lstatSync(filesPath) // checks if the path leads to a directory or a file

	// don't use replaceAll
	const urlPath = `/${path.relative(dirPath, filesPath)}` // path tha will be used for url
		.replace(/\.[^/.]+$/, "") // remove .md file extension
		.replace(/ /g, "-") // replace space with a dash "-"

	// if it's a directory, apply this function to every files/folders in it
	// if it's a file, read and add it to pageList
	if (stats.isDirectory()) {
		fs.readdirSync(filesPath).map((child) =>
			addFiles(`${filesPath}/${child}`)
		)
	} else if (stats.isFile()) {
		// skip if file is not a markdown file
		if (!fileOrFolderName.endsWith(".md")) {
			console.log(`Ignoring non markdown file at: ${filesPath}`)
			return
		}

		pageList[urlPath] = matter(fs.readFileSync(filesPath, "utf8")) // parse markdown metadata

		// sanitizing should happens here but this code removes blockquote for some reason
		// I might have to take a look at https://github.com/cure53/DOMPurify/issues/186 later
		// pageList[urlPath].content = DOMPurify.sanitize(
		// 	pageList[urlPath].content
		// )

		pageList[urlPath].meta = pageList[urlPath].data // change property name from data to meta

		pageList[urlPath].meta.toc = toc(pageList[urlPath].content).content
		// removes unnecessary data
		Object.keys(pageList[urlPath]).forEach(
			(key) =>
				removeExceptionArray.includes(key) ||
				delete pageList[urlPath][key]
		)
	}
}

// start recursive function + check if it's a directory
if (fs.lstatSync(dirPath).isDirectory()) {
	addFiles(dirPath)
} else {
	console.log("Path is not a directory. Result file will be empty.")
}

// write to json file
fs.writeFileSync(outPath, JSON.stringify(pageList) + "\n")
