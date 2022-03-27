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

/**
 * General
 */

export enum ParseMode {
	POSTS,
	SERIES,
	UNSEARCHABLE,
	PORTFOLIO,
}

export interface MarkdownData {
	content: string
	[key: string]: unknown
}

export interface PostData {
	title: string
	date: string
	readTime: string
	wordCount: number
	tags?: string[]
}

export interface PageData {
	title: string
	date: string
	readTime: string
	wordCount: number
	tags: string[]
	toc?: string
	content: string

	// series

	seriesHome: string
	prev?: string
	next?: string

	// series home

	order: string[]
	length: number

	// portfolio

	image: string // image url
	overview: string
	badges: string[]
	repo: string
}

/**
 * Series
 */

export interface Series {
	title: string
	date: string
	readTime: string
	wordCount: number
	order: string[]
	length: number
	tags?: string[]
}

export interface SeriesMap {
	// key: url
	[key: string]: SeriesEntry[]
}

export interface SeriesEntry {
	index: number
	url: string
}

/**
 * Portfolio
 */

export interface PortfolioData {
	// rendered markdown html
	overview_en: string
	overview_kr: string

	// a set of valid simple icons slug
	skills: Set<string>

	// key: url
	projects: {
		[key: string]: PortfolioProject
	}
}

export interface PortfolioOverview {
	// link to my github
	github: string
	description: string
}

export interface PortfolioProject {
	name: string
	image: string // url to the image
	overview: string
	badges: string[] // array of valid simpleIcons slug
	repo: string // url of the git repository
}
