import { contentDirectoryPath } from "../config"
import { addDocument } from "../searchIndex"
import { writeToFile } from "../util"
import { map } from ".."
import { DataToPass } from "."

export default function parseUnsearchable(data: DataToPass): void {
	const { urlPath: _urlPath, markdownData } = data

	// convert path like /XXX/YYY/ZZZ to /YYY/ZZZ
	const urlPath = _urlPath.slice(_urlPath.slice(1).indexOf("/") + 1)

	if (!urlPath.endsWith(".kr.md")) {
		addDocument({
			title: markdownData.title,
			body: markdownData.content,
			url: urlPath,
		})

		// Parse data that will be written to map.js
		map.unsearchable[urlPath] = {
			title: markdownData.title as string,
		}
	}

	/**
	 * Save content
	 */

	writeToFile(
		`${contentDirectoryPath}/unsearchable${urlPath}.json`,
		JSON.stringify({
			content: markdownData.content,
		})
	)
}
