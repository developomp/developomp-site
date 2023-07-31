import { contentMap, seriesMap } from "."

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
