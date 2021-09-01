import { useEffect, useState, useRef } from "react"
import styled from "styled-components"
import { useLocation, useHistory } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { DateRange, Range, OnDateRangeChangeProps } from "react-date-range"
import queryString from "query-string" // parsing url query
import elasticlunr from "elasticlunr" // search engine

import _map from "../data/map.json"
import searchIndex from "../data/search.json"
import theming from "../theming"

import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"

import Tag from "../components/Tag"
import TagList from "../components/TagList"
import PostCard from "../components/PostCard"

import { Map } from "../types/typings"

const map: Map = _map

const StyledSearch = styled.div`
	text-align: center;
`

const StyledSearchContainer = styled.div`
	display: flex;
	align-items: flex-start;

	@media screen and (max-width: ${theming.size.screen_size2}) {
		flex-direction: column-reverse;
	}
`

const StyledSearchControlContainer = styled.div`
	width: 100%;
	margin-left: 1rem;

	@media screen and (max-width: ${theming.size.screen_size2}) {
		margin-top: 2rem;
		margin-left: 0;
	}
`

const StyledDateRange = styled(DateRange)`
	width: 350px;
	height: 350px;

	@media screen and (max-width: ${theming.size.screen_size2}) {
		margin-top: 1rem;
	}
`

const StyledSearchBar = styled.input`
	width: 100%;
	border-radius: 100px; /* arbitrarily large value */
	height: 3rem;
	text-indent: 1rem;
	font-size: 1.25rem;
	outline: none;

	border: ${(props) =>
		theming.theme(props.theme.currentTheme, {
			light: "1px solid #ccc",
			dark: "1px solid #555",
		})};

	background-color: ${(props) =>
		theming.theme(props.theme.currentTheme, {
			light: theming.dark.color1,
			dark: theming.dark.backgroundColor1,
		})};

	color: ${(props) =>
		theming.theme(props.theme.currentTheme, {
			light: theming.light.color1,
			dark: theming.dark.color1,
		})};
`

// check if post date is withing the range
function isDateInRange(
	dateToCompare: string,
	from: string,
	to: string
): boolean {
	if (!dateToCompare) throw Error("No date to compare")

	const isFrom = !!from
	const isTo = !!to

	if (!isFrom && !isTo) return true
	if (!isFrom && isTo) return Date.parse(dateToCompare) < Date.parse(to)
	if (!isTo && isFrom) return Date.parse(dateToCompare) > Date.parse(from)

	const compareDate = Date.parse(dateToCompare)
	return Date.parse(from) < compareDate && compareDate < Date.parse(to)
}

// Search doesn't work on url change if component is not wrapped
// todo: find ways to get rid of wrapper component and use class component
export default function Search() {
	return <_Search />
}

function _Search() {
	const [index] = useState(elasticlunr.Index.load(searchIndex as never))
	const inputRef = useRef<HTMLInputElement>(null)

	const _history = useHistory()
	const _location = useLocation()

	// todo: handle duplicate/missing keys
	const _query = queryString.parse(_location.search)

	const query = {
		from: _query.from ? _query.from?.toString() : "",
		to: _query.to ? _query.to?.toString() : "",
		tags: _query.tags ? _query.tags.toString().split(",") : [],
		query: _query.query ? _query.query.toString() : "",
	}

	const defaultDateRange = [
		{
			startDate: new Date(0),
			endDate: undefined,
			key: "selection",
		},
	]

	const [dateRange, setDateRange] = useState<Array<Range>>(defaultDateRange)
	const [postCards, setPostCards] = useState<unknown[]>([])
	const [searchInput, setSearchInput] = useState(query.query)

	function doSearch() {
		_history.push({
			pathname: "/search",
			search: queryString.stringify({
				...(query.from && {
					from: query.from,
				}),
				...(query.to && {
					to: query.to,
				}),
				...(query.tags.length > 0 && {
					tags: query.tags.join(","),
				}),
				query: searchInput,
			}),
		})

		try {
			const _postCards: unknown[] = []
			for (const res of index.search(searchInput)) {
				const postData = map.posts[res.ref]

				// if post data exists,
				// date is within range,
				// and if post include tags
				if (
					postData &&
					isDateInRange(postData.date, query.from, query.to) &&
					true
				) {
					_postCards.push(
						<PostCard
							key={res.ref}
							postData={{
								url: res.ref,
								...postData,
							}}
						/>
					)
				}
				// apply search result
				setPostCards(_postCards)
			}
			// eslint-disable-next-line no-empty
		} catch (err) {
			console.error(err)
		}
	}

	useEffect(() => {
		doSearch()
	}, [dateRange])

	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			doSearch()
		}, 200)

		return () => clearTimeout(delayDebounceFn)
	}, [searchInput])

	return (
		<>
			<Helmet>
				<title>pomp | Search</title>
			</Helmet>

			<StyledSearch className="card main-content">
				<h1>Search</h1>

				<StyledSearchContainer>
					<StyledDateRange
						editableDateInputs={true}
						moveRangeOnFirstSelection={false}
						retainEndDateOnFirstSelection={true}
						ranges={dateRange}
						onChange={(item: OnDateRangeChangeProps) => {
							const historyToPush = {
								...(query.query && {
									query: query.query,
								}),
								...(query.from && {
									from: query.from,
								}),
								...(query.to && {
									to: query.to,
								}),
								...(query.tags.length > 0 && {
									tags: query.tags.join(","),
								}),
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

					<StyledSearchControlContainer
						onSubmit={(event) => {
							event.preventDefault()
						}}
					>
						<StyledSearchBar
							autoFocus
							type="text"
							ref={inputRef}
							value={searchInput}
							autoComplete="off"
							placeholder="Search"
							onChange={(event) => {
								setSearchInput(event.target.value)
							}}
							onKeyPress={(event) => {
								event.key === "Enter" &&
									searchInput &&
									doSearch()
							}}
						/>
						<br />
						<br />
						<small>
							<TagList>
								{query.tags.length > 0 &&
									query.tags.map((tag) => {
										return <Tag key={tag} text={tag} />
									})}
							</TagList>
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
										...(query.query && {
											query: query.query,
										}),
										...(query.from && {
											from: query.from,
										}),
										...(query.to && {
											to: query.to,
										}),
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
										...(query.query && {
											query: query.query,
										}),
										...(query.from && {
											from: query.from,
										}),
										...(query.to && {
											to: query.to,
										}),
										tags: "include2,!exclude2",
									}),
								})
							}}
						>
							Search test 2
						</button>
						<br />
						<button
							onClick={() => {
								_history.push({
									pathname: "/search",
									search: queryString.stringify({
										...(query.query && {
											query: query.query,
										}),
										...(query.tags.length > 0 && {
											tags: query.tags.join(","),
										}),
									}),
								})

								setDateRange(defaultDateRange)
							}}
						>
							Clear date
						</button>
						<br />
					</StyledSearchControlContainer>
				</StyledSearchContainer>
			</StyledSearch>
			{postCards}
		</>
	)
}
