import portfolio from "../../data/portfolio.json"
import _map from "../../data/map.json"

import type { SiteLocale } from "../../globalContext"
import type { Map, PageData } from "../../../types/types"

const map: Map = _map

export enum PageType {
	POST,
	SERIES,
	SERIES_HOME,
	PORTFOLIO_PROJECT,
	UNSEARCHABLE,
}

export enum URLValidity {
	VALID, // page does exist in selected language
	VALID_BUT_IN_OTHER_LOCALE, // page exists but only in another language
	NOT_VALID, // page does not exist
}

export async function fetchContent(
	pageType: PageType,
	url: string,
	locale: SiteLocale
) {
	try {
		if (pageType == PageType.UNSEARCHABLE) {
			if (locale == "en") {
				return await import(`../../data/content/unsearchable${url}.json`)
			} else {
				try {
					return await import(
						`../../data/content/unsearchable${url}.${locale}.json`
					)
				} catch {
					return await import(`../../data/content/unsearchable${url}.json`)
				}
			}
		}

		if (locale == "en") {
			return await import(`../../data/content${url}.json`)
		} else {
			try {
				return await import(`../../data/content${url}.${locale}.json`)
			} catch {
				return await import(`../../data/content${url}.json`)
			}
		}
	} catch (err) {
		return
	}
}

export function categorizePageType(content_id: string): PageType {
	if (content_id.startsWith("/post")) return PageType.POST
	if (content_id.startsWith("/portfolio")) return PageType.PORTFOLIO_PROJECT
	if (content_id.startsWith("/series")) {
		// if the URL looks like /series/series-title (if the url has two slashes)
		if ([...(content_id.match(/\//g) || [])].length == 2)
			return PageType.SERIES_HOME

		// if the URL looks like /series/series-title/post-title (if the url does not have 2 slashes)
		return PageType.SERIES
	}

	return PageType.UNSEARCHABLE
}

export function checkURLValidity(
	content_id: string,
	pageType: PageType
): URLValidity {
	// content ID of other language
	const alt_content_id = content_id.endsWith(".kr")
		? content_id.replace(/\.kr$/, "") // remove .kr suffix
		: content_id + ".kr" // add .kr suffix

	switch (pageType) {
		case PageType.POST: {
			if (map.posts[content_id]) return URLValidity.VALID

			if (map.posts[alt_content_id])
				return URLValidity.VALID_BUT_IN_OTHER_LOCALE

			break
		}

		case PageType.SERIES_HOME:
		case PageType.SERIES: {
			const series_keys = Object.keys(map.series)

			if (
				series_keys.some((seriesHomeURL) =>
					content_id.startsWith(seriesHomeURL)
				)
			)
				return URLValidity.VALID

			if (
				series_keys.some((seriesHomeURL) =>
					alt_content_id.startsWith(seriesHomeURL)
				)
			)
				return URLValidity.VALID_BUT_IN_OTHER_LOCALE

			break
		}

		case PageType.PORTFOLIO_PROJECT: {
			if (content_id in portfolio.projects) return URLValidity.VALID

			if (alt_content_id in portfolio.projects)
				return URLValidity.VALID_BUT_IN_OTHER_LOCALE

			break
		}

		case PageType.UNSEARCHABLE: {
			if (map.unsearchable[content_id]) return URLValidity.VALID

			if (map.unsearchable[alt_content_id])
				return URLValidity.VALID_BUT_IN_OTHER_LOCALE

			break
		}
	}

	return URLValidity.NOT_VALID
}

export function parsePageData(
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	fetched_content: any,
	pageType: PageType,
	content_id: string,
	locale: SiteLocale
): PageData {
	// page date to be saved as a react state
	const pageData: PageData = {
		title: "No title",
		date: "Unknown date",
		readTime: "Unknown read time",
		wordCount: 0,
		tags: [],
		toc: undefined,
		content: "No content",

		// series

		seriesHome: "",
		prev: "",
		next: "",

		// series home

		order: [],
		length: 0,

		// portfolio

		image: "",
		overview: "",
		badges: [],
		repo: "",
	}

	// load and parse content differently depending on the content type
	switch (pageType) {
		case PageType.POST: {
			const post = map.posts[content_id]

			pageData.content = fetched_content.content
			pageData.toc = fetched_content.toc

			pageData.title = post.title
			pageData.date = post.date
			pageData.readTime = post.readTime
			pageData.wordCount = post.wordCount
			pageData.tags = post.tags || []

			break
		}

		case PageType.SERIES: {
			const seriesURL = content_id.slice(0, content_id.lastIndexOf("/"))

			const curr = map.series[seriesURL].order.indexOf(content_id)
			const prev = curr - 1
			const next = curr + 1

			const post = map.posts[content_id]

			pageData.content = fetched_content.content
			pageData.toc = fetched_content.toc

			pageData.title = post.title
			pageData.date = post.date
			pageData.readTime = post.readTime
			pageData.wordCount = post.wordCount
			pageData.tags = post.tags || []

			pageData.seriesHome = seriesURL
			pageData.prev = prev >= 0 ? map.series[seriesURL].order[prev] : undefined
			pageData.next =
				next < map.series[seriesURL].order.length
					? map.series[seriesURL].order[next]
					: undefined

			break
		}

		case PageType.SERIES_HOME: {
			const seriesData = map.series[content_id]

			pageData.title = seriesData.title
			pageData.content = fetched_content.content

			pageData.date = seriesData.date
			pageData.readTime = seriesData.readTime
			pageData.wordCount = seriesData.wordCount
			pageData.order = seriesData.order
			pageData.length = seriesData.length

			break
		}

		case PageType.PORTFOLIO_PROJECT: {
			const data =
				portfolio.projects[content_id as keyof typeof portfolio.projects]

			pageData.content = fetched_content.content
			pageData.toc = fetched_content.toc

			pageData.title = data.name
			pageData.image = data.image
			pageData.overview = data.overview
			pageData.badges = data.badges
			pageData.repo = data.repo

			break
		}

		case PageType.UNSEARCHABLE: {
			pageData.title = (
				map.unsearchable[`${content_id}.${locale}`] ||
				map.unsearchable[content_id]
			).title
			pageData.content = fetched_content.content

			break
		}
	}

	return pageData
}
