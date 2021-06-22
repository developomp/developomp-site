/**
 * It reads markdown files and write its content and metadata to json files that can be imported by React.
 * -   Files and directories names starting with a underscore (_) will be ignored
 * -   Symbolic links are ignored as of the moment
 * -   Filename-to-url encoder is not perfect. Some non-url-friendly filenames might cause problems
 */

import fs from "fs" // read and write files
import path from "path" // get relative path
import matter from "gray-matter" // parse markdown metadata
import toc from "markdown-toc" // table of contents generation

const dirPath = "./markdown" // where it will look for markdown documents
const outPath = "./src/data" // path to the json database

// data that will be converted to JSON string
const result = {
	date: {},
	tags: {},
	posts: {},
}

// creates directory/directories
// https://stackoverflow.com/a/40686946/12979111
function mkDirByPathSync(targetDir, { isRelativeToScript = false } = {}) {
	const sep = path.sep
	const initDir = path.isAbsolute(targetDir) ? sep : ""
	const baseDir = isRelativeToScript ? __dirname : "."

	return targetDir.split(sep).reduce((parentDir, childDir) => {
		const curDir = path.resolve(baseDir, parentDir, childDir)
		try {
			fs.mkdirSync(curDir)
		} catch (err) {
			if (err.code === "EEXIST") {
				// curDir already exists!
				return curDir
			}

			// To avoid `EISDIR` error on Mac and `EACCES`-->`ENOENT` and `EPERM` on Windows.
			if (err.code === "ENOENT") {
				// Throw the original parentDir error on curDir `ENOENT` failure.
				throw new Error(
					`EACCES: permission denied, mkdir '${parentDir}'`
				)
			}

			const caughtErr =
				["EACCES", "EPERM", "EISDIR"].indexOf(err.code) > -1
			if (
				!caughtErr ||
				(caughtErr && curDir === path.resolve(targetDir))
			) {
				throw err // Throw if it's just the last created dir.
			}
		}

		return curDir
	}, initDir)
}

// only supports folders and files (no symbolic links)
// does not scale well for large number of folders
// it calls itself for every directory it finds
function recursiveParser(fileOrFolderPath: string) {
	// ignore if file/directory name starts with a underscore
	const fileOrFolderName = fileOrFolderPath.substring(
		fileOrFolderPath.lastIndexOf("/") + 1
	)
	if (fileOrFolderName.startsWith("_")) return

	// not perfect. Some filenames might cause problems.
	const stats = fs.lstatSync(fileOrFolderPath) // checks if the path leads to a directory or a file

	// don't use replaceAll
	const urlPath = `/${path.relative(dirPath, fileOrFolderPath)}` // path that will be used as site url
		.replace(/\.[^/.]+$/, "") // remove file extension
		.replace(/ /g, "-") // replace space with a dash "-"

	// if it's a directory, apply this function to every files/folders in it
	// if it's a file, parse and save it to file
	if (stats.isDirectory()) {
		fs.readdirSync(fileOrFolderPath).map((child) =>
			recursiveParser(`${fileOrFolderPath}/${child}`)
		)
	} else if (stats.isFile()) {
		// skip if file is not a markdown file
		if (!fileOrFolderName.endsWith(".md")) {
			console.log(`Ignoring non markdown file at: ${fileOrFolderPath}`)
			return
		}

		const parsedMarkdown = matter(fs.readFileSync(fileOrFolderPath, "utf8")) // parse markdown metadata
		const contentJSONFile = `${outPath}/posts${urlPath}.json`

		mkDirByPathSync(
			contentJSONFile.substring(0, contentJSONFile.lastIndexOf("/") + 1)
		)

		// write content to json file
		fs.writeFileSync(
			contentJSONFile,
			JSON.stringify({
				content: parsedMarkdown.content,
			})
		)

		result.posts[urlPath] = parsedMarkdown.data

		// date
		if (!result.posts[urlPath].date) {
			throw Error(`Date does not exist in file: ${urlPath}`)
		}
		result.posts[urlPath].date = new Date(
			parsedMarkdown.data.date
		).toLocaleString("default", {
			month: "short",
			day: "numeric",
			year: "numeric",
		})
		if (result.date[result.posts[urlPath].date])
			result.date[result.posts[urlPath].date].push(urlPath)
		else result.date[result.posts[urlPath].date] = [urlPath]

		//tags
		if (result.posts[urlPath].tags) {
			result.posts[urlPath].tags.forEach((tag) => {
				if (result.tags[tag]) result.tags[tag].push(urlPath)
				else result.tags[tag] = [urlPath]
			})
		}

		// toc
		result.posts[urlPath].toc = toc(result.posts[urlPath].content).content
	}
}

/** Step 1
 *  Deleting existing files
 */
try {
	fs.rmSync(`${outPath}/posts`, { recursive: true })
	// eslint-disable-next-line no-empty
} catch (err) {}

try {
	fs.unlinkSync(`${outPath}/posts.json`)
	// eslint-disable-next-line no-empty
} catch (err) {}

/** Step 2
 *  Populate result and write to src/data/posts/
 */

// check if it's a directory and start recursive function
if (fs.lstatSync(dirPath).isDirectory()) {
	recursiveParser(dirPath)
} else {
	throw Error("Initial path given does not lead to a directory")
}

/** Step 3
 *  write to src/data/posts.json
 */

fs.writeFileSync(`${outPath}/posts.json`, JSON.stringify(result) + "\n")
