export interface Map {
	// key: YYYY-MM-DD
	// value: url
	date: {
		[key: string]: string[]
	}

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
		[key: string]: {
			title: string
			date: string
			tags: string[]
			preview: string
		}
	}

	// series posts have "previous post" and "next post" button so they need to be ordered
	series: {
		[key: string]: {
			title: string
			length: number
			order: string[] // url order
			tags: string[]
		}
	}

	// urls of unsearchable posts
	// it is here to quickly check if a post exists or not
	unsearchable: {
		[key: string]: {
			title: string
		}
	}
}

export interface SeriesMap {
	// key: url
	[key: string]: {
		index: number
		url: string
	}[]
}
