export interface ContentMap {
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
}

/**
 * General
 */

export enum ParseMode {
    POSTS,
    SERIES,
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
}

export interface Badge {
    svg: string
    hex: string
    isDark: boolean
    title: string
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
