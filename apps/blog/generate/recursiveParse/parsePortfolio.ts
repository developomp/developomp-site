import tinycolor from "tinycolor2"
import icons from "simple-icons/icons"
import { SimpleIcon } from "simple-icons"

import { contentDirectoryPath, iconsDirectoryPath } from "../config"
import { generateToc } from "../parseMarkdown"
import { writeToFile } from "../util"
import { portfolioData } from ".."
import { DataToPass } from "."

export default function parsePortfolio(data: DataToPass): void {
	const { urlPath, markdownRaw, markdownData } = data

	if (markdownData.badges) {
		;(markdownData.badges as string[]).forEach((slug) => {
			// todo: handle cases when icon is not on simple-icons
			const icon: SimpleIcon =
				// @ts-ignore
				icons["si" + slug[0].toUpperCase() + slug.slice(1)]

			portfolioData.skills.add(slug)

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
		overview: markdownData.overview as string,
		badges: (markdownData.badges as string[]) || [],
		repo: (markdownData.repo as string) || "",
	}

	writeToFile(
		`${contentDirectoryPath}${urlPath}.json`,
		JSON.stringify({
			content: markdownData.content,
			toc: generateToc(markdownRaw),
		})
	)
}
