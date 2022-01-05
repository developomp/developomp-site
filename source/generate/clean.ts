import fs from "fs"

import {
	contentDirectoryPath,
	iconsDirectoryPath,
	mapFilePath,
	portfolioFilePath,
	searchIndexFilePath,
} from "./config"

export default function clean() {
	/**
	 * Delete directories
	 */

	try {
		fs.rmSync(contentDirectoryPath, { recursive: true })
		// eslint-disable-next-line no-empty
	} catch (err) {}

	try {
		fs.rmSync(iconsDirectoryPath, { recursive: true })
		// eslint-disable-next-line no-empty
	} catch (err) {}

	/**
	 * Delete folders
	 */

	try {
		fs.unlinkSync(mapFilePath)
		// eslint-disable-next-line no-empty
	} catch (err) {}

	try {
		fs.unlinkSync(portfolioFilePath)
		// eslint-disable-next-line no-empty
	} catch (err) {}

	try {
		fs.unlinkSync(searchIndexFilePath)
		// eslint-disable-next-line no-empty
	} catch (err) {}
}
