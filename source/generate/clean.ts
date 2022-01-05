import fs from "fs"

import { contentDirectoryPath, mapFilePath } from "./config"

export default function clean() {
	try {
		fs.rmSync(contentDirectoryPath, { recursive: true })
		// eslint-disable-next-line no-empty
	} catch (err) {}

	try {
		fs.unlinkSync(mapFilePath)
		// eslint-disable-next-line no-empty
	} catch (err) {}
}
