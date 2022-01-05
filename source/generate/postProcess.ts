import { map, seriesMap } from "."

export default function postProcess() {
	/**
	 * Sort date
	 */

	const TmpDate = map.date
	map.date = {}
	Object.keys(TmpDate)
		.sort()
		.forEach((sortedDateKey) => {
			map.date[sortedDateKey] = TmpDate[sortedDateKey]
		})

	/**
	 * Fill meta data
	 */

	map.meta.tags = Object.keys(map.tags)

	/**
	 * Parse Series
	 */

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
		map.series[seriesURL].order = seriesMap[seriesURL].map(
			(item) => item.url
		)
	}
}
