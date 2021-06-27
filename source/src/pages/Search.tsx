import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { DateRange } from "react-date-range"
import queryString from "query-string"

import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"

import theming from "../theming"
import pages from "../data/posts.json"

const StyledSearch = styled.div`
	margin: auto;
	margin-top: 2rem;
	text-align: center;
	color: ${(props) =>
		theming.theme(props.theme.currentTheme, {
			light: "#111111",
			dark: "#EEEEEE",
		})};
`

interface SearchProps {}

interface SearchState {
	tags: string[]
	dateRange: unknown[]
	query: {
		from?: string // YYYYMMDD
		to?: string // YYYYMMDD
		tags?: string[] // ["include", "!doNotInclude"]
	}
}

export default class Search extends React.Component<SearchProps, SearchState> {
	constructor(props) {
		super(props)
		const tags: string[] = []

		for (const tag in pages.tags) {
			tags.push(tag)
		}

		const parsedQuery = queryString.parse(location.search)
		parsedQuery.tags = parsedQuery.tags
			? (parsedQuery.tags as string).split(",")
			: []

		this.state = {
			tags: tags,
			dateRange: [
				{
					startDate: new Date(),
					endDate: null,
					key: "selection",
				},
			],
			query: parsedQuery,
		}
	}

	render() {
		return (
			<>
				<Helmet>
					<title>pomp | Search</title>

					<meta property="og:title" content="Search" />
					<meta property="og:type" content="website" />
					<meta
						property="og:url"
						content={`${process.env.PUBLIC_URL}`}
					/>
					<meta
						property="og:image"
						content={`${process.env.PUBLIC_URL}/icon/icon.svg`}
					/>
					<meta property="og:description" content="search" />
				</Helmet>

				<StyledSearch className="card main-content">
					<DateRange
						editableDateInputs={true}
						moveRangeOnFirstSelection={false}
						retainEndDateOnFirstSelection={true}
						ranges={this.state.dateRange}
						onChange={(item) => {
							this.setState({ dateRange: [item.selection] })
						}}
					/>
					<br />
					available tags: {this.state.tags}
					<br />
					<br />
					selected tags: {this.state.query.tags?.join(", ")}
					<br />
					date from: {this.state.query.from}
					<br />
					date to: {this.state.query.to}
					<br />
					<Link to="/search?&from=YYYYMMDD&to=TTTTMMDD&tags=include,!exclude">
						Search
					</Link>
				</StyledSearch>
			</>
		)
	}
}
