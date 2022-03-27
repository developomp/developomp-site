import simpleIcons from "simple-icons"
import tinycolor from "tinycolor2"

import { contentDirectoryPath, iconsDirectoryPath } from "../config"
import { PortfolioProject } from "../../types/types"
import { generateToc } from "../parseMarkdown"
import { writeToFile } from "../util"
import { portfolioData } from ".."
import { DataToPass } from "."

export default function parsePortfolio(data: DataToPass): void {
	const { urlPath, markdownRaw, markdownData, path } = data

	// check if the file is a portfolio overview or a project
	// explanation: file `0.md` is a special file (i.e. not a regular project file)
	if (path.endsWith("/0.md")) {
		portfolioData.overview_en = markdownData.content
	} else if (path.endsWith("/0.kr.md")) {
		portfolioData.overview_kr = markdownData.content
	} else {
		if (!urlPath.endsWith(".kr")) {
			if (markdownData.badges) {
				;(markdownData.badges as string[]).forEach((slug) => {
					// todo: handle cases when icon is not on simple-icons

					portfolioData.skills.add(slug)

					const icon = simpleIcons.Get(slug)

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

			const project: PortfolioProject = {
				name: markdownData.name as string,
				image: markdownData.image as string,
				overview: markdownData.overview as string,
				badges: (markdownData.badges as string[]) || [],
				repo: (markdownData.repo as string) || "",
			}

			portfolioData.projects[urlPath] = project
		}

		writeToFile(
			`${contentDirectoryPath}${urlPath}.json`,
			JSON.stringify({
				content: markdownData.content,
				toc: generateToc(markdownRaw),
			})
		)
	}
}
