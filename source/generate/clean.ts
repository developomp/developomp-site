import fs from "fs"

import {
	contentDirectoryPath,
	iconsDirectoryPath,
	mapFilePath,
	portfolioFilePath,
	searchIndexFilePath,
} from "./config"

export default function clean() {
	deleteDirectory(contentDirectoryPath)
	deleteDirectory(iconsDirectoryPath)

	deleteFile(mapFilePath)
	deleteFile(portfolioFilePath)
	deleteFile(searchIndexFilePath)

	deleteFile("./public/img/skills.svg")
	deleteFile("./public/img/projects.svg")
}

function deleteDirectory(path: string) {
	try {
		fs.rmSync(path, { recursive: true })
		// eslint-disable-next-line no-empty
	} catch (err) {}
}

function deleteFile(path: string) {
	try {
		fs.unlinkSync(path)
		// eslint-disable-next-line no-empty
	} catch (err) {}
}
