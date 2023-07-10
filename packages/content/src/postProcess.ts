import ejs from "ejs"
import { readFileSync } from "fs"
import * as icons from "simple-icons"
import { optimize } from "svgo"
import tinycolor from "tinycolor2"

import { contentMap, seriesMap } from "."
import skills from "./portfolio/skills.json" assert { type: "json" }
import { Badge } from "./types/types"
import { writeToFile } from "./util"

export function sortDates() {
    const TmpDate = contentMap.date
    contentMap.date = {}
    Object.keys(TmpDate)
        .sort()
        .forEach((sortedDateKey) => {
            contentMap.date[sortedDateKey] = TmpDate[sortedDateKey]
        })
}

export function fillTags() {
    contentMap.meta.tags = Object.keys(contentMap.tags)
}

export function parseSeries() {
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
        contentMap.series[seriesURL].length = seriesMap[seriesURL].length
        contentMap.series[seriesURL].order = seriesMap[seriesURL].map(
            (item) => item.url
        )
    }
}

export function generatePortfolioSVGs() {
    /**
     * render skills.svg
     */

    // todo: wait add ejs once it's available

    const style = readFileSync("./src/portfolio/style.css", "utf-8")

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
        readFileSync("./src/portfolio/skills.ejs", "utf-8"),
        { style, data },
        { views: ["./src/portfolio"] }
    )

    writeToFile(
        "./dist/skills.svg",
        optimize(renderedSVG, { multipass: true }).data
    )
}

function parseBadge(badgeRaw: string): Badge {
    const isMultiWord = badgeRaw.includes(" ")
    const words = badgeRaw.split(" ")
    const slug = words[0]

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const icon = icons["si" + slug[0].toUpperCase() + slug.slice(1)]

    const color = tinycolor(icon.hex).lighten(5).desaturate(5)

    return {
        svg: icon.svg,
        hex: color.toHexString(),
        isDark: color.isDark(),
        title: isMultiWord ? words.slice(1).join(" ") : icon.title,
    }
}
