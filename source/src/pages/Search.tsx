import { useState } from "react"
import styled from "styled-components"
import { BrowserRouter, useLocation, useHistory } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { DateRange } from "react-date-range"
import queryString from "query-string"

import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"

import theming from "../theming"
import map from "../data/map.json"
import Tag from "../components/Tag"

const StyledSearch = styled.div`
	text-align: center;

	color: ${(props) =>
		theming.theme(props.theme.currentTheme, {
			light: theming.dark.color1,
			dark: theming.dark.color1,
		})};
`

const StyledSearchContainer = styled.div`
	display: flex;

	@media screen and (max-width: ${theming.size.screen_size2}) {
		display: block;
	}
`

const StyledSearchControlContainer = styled.div`
	width: 100%;
	margin: 0 0 0 1rem;

	@media screen and (max-width: ${theming.size.screen_size2}) {
		margin-top: 2rem;
	}
`

const StyledSearchResult = styled.div``

const StyledTagTable = styled.table`
	margin: 0 auto 0 auto;
`

export default function Search() {
	return (
		<BrowserRouter>
			<_Search />
		</BrowserRouter>
	)
}

// have to be in a separate component for tags to update when the urls change
// todo: check if using keys will fix the issue
function _Search() {
	const _history = useHistory()
	const _location = useLocation()

	// todo: handle duplicate/missing keys
	const _query = queryString.parse(_location.search)

	const query = {
		from: _query.from ? _query.from?.toString() : "",
		to: _query.to ? _query.to?.toString() : "",
		tags: _query.tags ? _query.tags.toString().split(",") : [],
	}

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
				<h1>Search</h1>

				<StyledSearchContainer>
					<DateRange
						editableDateInputs={true}
						moveRangeOnFirstSelection={false}
						retainEndDateOnFirstSelection={true}
						ranges={dateRange}
						onChange={(item) => {
							const historyToPush = {
								from: query.from,
								to: query.to,
								tags: query.tags.join(","),
							}

							// convert Date to YYYY-MM-DD string if it exists
							if (item.selection.startDate != null)
								historyToPush.from = item.selection.startDate
									.toISOString()
									.split("T")[0]

							if (item.selection.endDate != null)
								historyToPush.to = item.selection.endDate
									.toISOString()
									.split("T")[0]

							_history.push({
								pathname: "/search",
								search: queryString.stringify(historyToPush),
							})

							setDateRange([item.selection])
						}}
					/>

					<StyledSearchControlContainer>
						<input type="text" />
						<br />
						<br />
						<small>
							<StyledTagTable>
								{query.tags?.map((tag) => {
									return (
										<td key={tag}>
											<Tag text={tag} />
										</td>
									)
								})}
							</StyledTagTable>
						</small>
						<br />
						date from: {query.from}
						<br />
						date to: {query.to}
						<br />
						<button
							onClick={() => {
								_history.push({
									pathname: "/search",
									search: queryString.stringify({
										from: query.from,
										to: query.to,
										tags: "include,!exclude",
									}),
								})
							}}
						>
							Search test 1
						</button>
						|
						<button
							onClick={() => {
								_history.push({
									pathname: "/search",
									search: queryString.stringify({
										from: query.from,
										to: query.to,
										tags: "include2,!exclude2",
									}),
								})
							}}
						>
							Search test 2
						</button>
					</StyledSearchControlContainer>
				</StyledSearchContainer>
				<StyledSearchResult>{map.meta.tags}</StyledSearchResult>
			</StyledSearch>
		</>
	)
}
