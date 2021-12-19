export enum ParseMode {
	POSTS,
	SERIES,
	UNSEARCHABLE,
}

export interface Base {}

export interface PostData {
	title: string
	date: string
	readTime: string
	wordCount: number
	tags?: string[]
}

export interface Series {
	title: string
	date: string
	readTime: string
	wordCount: number
	order: string[]
	length: number
	tags?: string[]
}

export interface FetchedPage {
	title: string
	date: string
	readTime: string
	wordCount: number
	tags: string[]
	toc?: string
	content: string
}

export interface Map {
	// key: YYYY-MM-DD
	// value: url
	date: { [key: string]: string[] }

	// key: tag name
	// value: url
	tags: {
		[key: string]: string[]
	}

	// list of all meta data
	meta: {
		tags: string[]
	}

	// searchable, non-series posts
	// must have a post date
	// tag is not required
	posts: {
		[key: string]: PostData
	}

	// series posts have "previous post" and "next post" button so they need to be ordered
	series: { [key: string]: Series }

	// urls of unsearchable posts
	// it is here to quickly check if a post exists or not
	unsearchable: { [key: string]: { title: string } }
}

export interface SeriesEntry {
	index: number
	url: string
}

export interface SeriesMap {
	// key: url
	[key: string]: SeriesEntry[]
}

export interface MarkdownData {
	content: string
	date: string
	title: string
	tags: string[]
}
