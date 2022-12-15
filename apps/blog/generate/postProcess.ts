import ejs from "ejs"
import { optimize } from "svgo"
import { readFileSync, writeFileSync } from "fs"
import tinycolor from "tinycolor2"

import { map, seriesMap } from "."
import { Badge } from "../src/components/Badge"

import skills from "./portfolio/skills.json"

export default function postProcess() {
	sortDates()
	fillTags()
	parseSeries()
	generatePortfolioSVGs()
}

function sortDates() {
	const TmpDate = map.date
	map.date = {}
	Object.keys(TmpDate)
		.sort()
		.forEach((sortedDateKey) => {
			map.date[sortedDateKey] = TmpDate[sortedDateKey]
		})
}

function fillTags() {
	map.meta.tags = Object.keys(map.tags)
}

function parseSeries() {
	// sort series map
	for (const seriesURL in seriesMap) {
		seriesMap[seriesURL].sort((a, b) => {
			if (a.index < b.index) return -1
			if (a.index > b.index) return 1

			return 0
		})
	}

	// series length and order
	for (const seriesURL in seriesMap) {
		map.series[seriesURL].length = seriesMap[seriesURL].length
		map.series[seriesURL].order = seriesMap[seriesURL].map((item) => item.url)
	}
}

function generatePortfolioSVGs() {
	/**
	 * render skills.svg
	 */

	// todo: wait add ejs once it's available

	const style = readFileSync("./generate/portfolio/style.css", "utf-8")

	const data: {
		[key: string]: Badge[] | { [key: string]: Badge[] }
	} = {}

	// C O G N I T O - H A Z A R D
	// THIS PART OF THE CODE WAS WRITTEN IN 3 AM
	// C O G N I T O - H A Z A R D

	for (const key in skills) {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		if (skills[key] instanceof Array) {
			if (!data[key]) {
				data[key] = []
			}

			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			;(skills[key] as string[]).forEach((badge) =>
				(data[key] as Badge[]).push(parseBadge(badge))
			)
		} else {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			for (const subKey in skills[key]) {
				if (!data[key]) data[key] = {}

				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				if (!data[key][subKey]) {
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					data[key][subKey] = []
				}

				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				skills[key][subKey].forEach((badge: string) =>
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore
					(data[key][subKey] as Badge[]).push(parseBadge(badge))
				)
			}
		}
	}

	const renderedSVG = ejs.render(
		readFileSync("./generate/portfolio/skills.ejs", "utf-8"),
		{ style, data },
		{ views: ["./generate/portfolio"] }
	)

	writeFileSync(
		"./public/img/skills.svg",
		optimize(renderedSVG, { multipass: true }).data
	)
}

function parseBadge(badgeRaw: string): Badge {
	const isMultiWord = badgeRaw.includes(" ")
	const words = badgeRaw.split(" ")

	const icon = isMultiWord
		? // eslint-disable-next-line @typescript-eslint/no-var-requires
		  require("simple-icons")[words[0]]
		: // eslint-disable-next-line @typescript-eslint/no-var-requires
		  require("simple-icons")[badgeRaw]

	const color = tinycolor(icon.hex).lighten(5).desaturate(5)

	return {
		svg: icon.svg,
		hex: color.toHexString(),
		isDark: color.isDark(),
		title: isMultiWord ? words.slice(1).join(" ") : icon.title,
	}
}