import { useState } from "react"
import styled from "styled-components"
import { Link, BrowserRouter, useLocation } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { DateRange } from "react-date-range"
import queryString from "query-string"

import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"

import theming from "../theming"
import map from "../data/map.json"
import Tag from "../components/Tag"

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

const StyledTagTable = styled.table`
	margin-left: auto;
	margin-right: auto;
`

export default function Search() {
	return (
		<BrowserRouter>
			<_Search />
		</BrowserRouter>
	)
}

function _Search() {
	const parsedQuery = queryString.parse(useLocation().search)
	parsedQuery.tags = parsedQuery.tags
		? (parsedQuery.tags as string).split(",")
		: []

	const [dateRange, setDateRange] = useState([
		{
			startDate: new Date(),
			endDate: null,
			key: "selection",
		},
	])

	return (
		<>
			<Helmet>
				<title>pomp | Search</title>

				<meta property="og:title" content="Search" />
				<meta property="og:type" content="website" />
				<meta property="og:url" content={process.env.PUBLIC_URL} />
				<meta
					property="og:image"
					content={process.env.PUBLIC_URL + "/icon/icon.svg"}
				/>
				<meta property="og:description" content="search" />
			</Helmet>

			<StyledSearch className="card main-content">
				<DateRange
					editableDateInputs={true}
					moveRangeOnFirstSelection={false}
					retainEndDateOnFirstSelection={true}
					ranges={dateRange}
					onChange={(item) => {
						setDateRange([item.selection])
					}}
				/>
				<br />
				available tags:
				<small>
					<StyledTagTable>
						{map.meta.tags.map((tag) => {
							return (
								<td key={tag}>
									<Tag text={tag} />
								</td>
							)
						})}
					</StyledTagTable>
				</small>
				<br />
				<br />
				Selected tags:
				<small>
					<StyledTagTable>
						{parsedQuery.tags?.map((tag) => {
							return (
								<td key={tag}>
									<Tag text={tag} />
								</td>
							)
						})}
					</StyledTagTable>
				</small>
				<br />
				date from: {parsedQuery.from}
				<br />
				date to: {parsedQuery.to}
				<br />
				<Link to="/search?&from=YYYYMMDD&to=YYYYMMDD&tags=include,!exclude">
					Search1
				</Link>
				<Link to="/search?&from=YYYYMMDD&to=YYYYMMDD&tags=include2,!exclude2">
					Search2
				</Link>
			</StyledSearch>
		</>
	)
}
