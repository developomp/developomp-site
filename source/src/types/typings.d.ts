export interface TocElement {
	slug: string
	content: string
	i: number
	lvl: number
}

export interface Post {
	title: string
	preview: string
	date: string
	readTime: string
	wordCount: number
	tags?: string[]
}

export interface Series {
	title: string
	preview: string
	date: string
	readTime: string
	wordCount: number
	order: string[]
	length: number
}

export interface FetchedPage {
	title: string
	preview: string
	date: string
	readTime: string
	wordCount: number
	tags: string[]
	toc: JSX.Element | undefined
	content: string
}

interface Map {
	date: { [date: string]: string[] }
	tags: { [tag: string]: string[] }
	meta: { tags: string[] }
	posts: { [url: string]: Post }
	series: { [url: string]: Series }
	unsearchable: { [url: string]: { title: string } }
}

declare module "*.json" {
	const data: Map
	export default data
}
