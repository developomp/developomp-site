import ejs from "ejs"
import { optimize, OptimizedSvg } from "svgo"
import { readFileSync, writeFileSync } from "fs"
import simpleIcon from "simple-icons"
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

	const data: { [key in keyof typeof skills]: Badge[] } = {
		programmingLanguage: [],
		frontEndWeb: [],
		frontEndDesktop: [],
		gameDev: [],
	}

	for (const skillCategory in skills) {
		skills[skillCategory as keyof typeof skills].forEach((badge: string) => {
			data[skillCategory as keyof typeof skills].push(parseBadge(badge))
		})
	}

	const renderedSVG = ejs.render(
		readFileSync("./generate/portfolio/skills.ejs", "utf-8"),
		{ style, data },
		{ views: ["./generate/portfolio"] }
	)

	const optimizedSVG = optimize(renderedSVG, { multipass: true })

	if (optimizedSVG.error) {
		console.error("Failed to generate optimized skills.svg")
		return
	}

	writeFileSync("./public/img/skills.svg", (optimizedSVG as OptimizedSvg).data)
}

function parseBadge(badgeRaw: string): Badge {
	const isMultiWord = badgeRaw.includes(" ")
	const words = badgeRaw.split(" ")

	const icon = isMultiWord ? simpleIcon.Get(words[0]) : simpleIcon.Get(badgeRaw)

	const color = tinycolor(icon.hex).lighten(5).desaturate(5)

	return {
		svg: icon.svg,
		hex: color.toHexString(),
		isDark: color.isDark(),
		title: isMultiWord ? words.slice(1).join(" ") : icon.title,
	}
}
