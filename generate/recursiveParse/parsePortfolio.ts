import tinycolor from "tinycolor2"

import { contentDirectoryPath, iconsDirectoryPath } from "../config"
import { generateToc } from "../parseMarkdown"
import { writeToFile } from "../util"
import { portfolioData } from ".."
import { DataToPass } from "."

export default function parsePortfolio(data: DataToPass): void {
	const { urlPath, markdownRaw, markdownData } = data

	if (urlPath.endsWith(".kr")) {
		const contentID = urlPath.slice(0, urlPath.length - 3)

		if (portfolioData.projects[contentID]) {
			portfolioData.projects[contentID] = {
				...portfolioData.projects[contentID],
				overview_kr: markdownData.overview as string,
			}
		} else {
			portfolioData.projects[contentID] = {
				name: "",
				image: "",
				overview_en: "",
				overview_kr: markdownData.overview as string,
				badges: [],
				repo: "",
			}
		}
	} else {
		if (markdownData.badges) {
			;(markdownData.badges as string[]).forEach((slug) => {
				// todo: handle cases when icon is not on simple-icons

				portfolioData.skills.add(slug)

				// eslint-disable-next-line @typescript-eslint/no-var-requires
				const icon = require("simple-icons")[slug]

				const color = tinycolor(icon.hex).lighten(5).desaturate(5)

				// save svg icon
				writeToFile(
					`${iconsDirectoryPath}/${icon.slug}.json`,
					JSON.stringify({
						svg: icon.svg,
						hex: color.toHexString(),
						isDark: color.isDark(),
						title: icon.title,
					})
				)
			})
		}

		portfolioData.projects[urlPath] = {
			name: markdownData.name as string,
			image: markdownData.image as string,
			overview_en: markdownData.overview as string,
			overview_kr: portfolioData.projects[urlPath]
				? portfolioData.projects[urlPath].overview_kr
				: "",
			badges: (markdownData.badges as string[]) || [],
			repo: (markdownData.repo as string) || "",
		}
	}

	writeToFile(
		`${contentDirectoryPath}${urlPath}.json`,
		JSON.stringify({
			content: markdownData.content,
			toc: generateToc(markdownRaw),
		})
	)
}
