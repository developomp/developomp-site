/* eslint-disable react/prop-types */

import { useEffect, useState, useRef } from "react"
import styled from "styled-components"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { DateRange, Range } from "react-date-range"

import queryString from "query-string" // parsing url query
import elasticlunr from "elasticlunr" // search engine

import _map from "../../data/map.json"
import searchData from "../../data/search.json"
import theming from "../../styles/theming"

import PostCard from "../../components/PostCard"
import MainContent from "../../components/MainContent"

import SearchBar from "./SearchBar"
import TagSelect, { TagsData } from "./TagSelect"

import { Map } from "../../../types/typing"

import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"

const map: Map = _map

const searchIndex = elasticlunr.Index.load(searchData as never)

export interface Query {
	from: string
	to: string
	tags: string[]
	query: string
}

const StyledSearch = styled(MainContent)`
	text-align: center;
`

const DateRangeControl = styled.div`
	width: 350px;

	@media screen and (max-width: ${theming.size.screen_size2}) {
		margin-top: 2rem;
	}
`

const ClearDateButton = styled.button`
	width: 100%;
	height: 2.5rem;

	border: none;
	cursor: pointer;

	background-color: tomato; /* 🍅 mmm tomato 🍅 */
	color: white;
	font-weight: bold;
`

const StyledDateRange = styled(DateRange)`
	width: 100%;
	height: 350px;
`

const StyledSearchContainer = styled.div`
	display: flex;
	align-items: flex-start;

	@media screen and (max-width: ${theming.size.screen_size2}) {
		flex-direction: column-reverse;
		align-items: center;
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

function isSelectedTagsInPost(selectedTags?: TagsData[], postTags?: string[]) {
	if (!selectedTags || selectedTags.length <= 0) return true
	if (!postTags || postTags.length <= 0) return false

	// if tag is empty or undefined
	const tagValues = selectedTags.map((value) => value.value)
	if (!postTags.every((val) => tagValues.includes(val))) return false

	return true
}

// Search doesn't work on url change if component is not wrapped
const Search = () => {
	const inputRef = useRef<HTMLInputElement | null>(null)

	const navigate = useNavigate()
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_, setSearchParams] = useSearchParams()
	const _location = useLocation()

	// todo: handle duplicate/missing keys
	const _query = queryString.parse(_location.search)

	const query: Query = {
		from: _query.from ? _query.from?.toString() : "",
		to: _query.to ? _query.to?.toString() : "",
		tags: _query.tags ? _query.tags.toString().split(",") : [],
		query: _query.query ? _query.query.toString() : "",
	}

	const defaultDateRange = [
		{
			startDate: undefined,
			endDate: undefined,
			key: "selection",
		},
	]

	const [postCards, setPostCards] = useState<unknown[]>([])
	const [dateRange, setDateRange] = useState<Array<Range>>(defaultDateRange)
	const [searchInput, setSearchInput] = useState(query.query)
	const [selectedTags, setSelectedOption] = useState<TagsData[] | undefined>(
		query.tags.map((elem) => ({ label: elem, value: elem }))
	)

	function doSearch() {
		navigate("/search")
		setSearchParams({
			...(searchInput && {
				query: searchInput,
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
		})

		try {
			const _postCards: unknown[] = []
			for (const res of searchIndex.search(searchInput)) {
				const postData = map.posts[res.ref]

				if (
					postData && // if post data exists
					isDateInRange(postData.date, query.from, query.to) && // date is within range
					isSelectedTagsInPost(selectedTags, postData.tags) // if post include tags
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
			}
			// apply search result
			setPostCards(_postCards)
			// todo: set _postCards.length

			// eslint-disable-next-line no-empty
		} catch (err) {
			console.error(err)
		}
	}

	useEffect(() => {
		doSearch()
	}, [dateRange, selectedTags])

	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			doSearch()
		}, 200)

		return () => clearTimeout(delayDebounceFn)
	}, [searchInput])

	function clearDate() {
		navigate("/search")
		setSearchParams({
			...(query.query && {
				query: query.query,
			}),
			...(query.tags.length > 0 && {
				tags: query.tags.join(","),
			}),
		})
		setDateRange(defaultDateRange)
	}

	function onDateRangeChange(item: { [key: string]: Range }) {
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
		if (item.selection.startDate)
			historyToPush.from = item.selection.startDate
				.toISOString()
				.split("T")[0]

		if (item.selection.endDate)
			historyToPush.to = item.selection.endDate
				.toISOString()
				.split("T")[0]

		navigate("/search")
		setSearchParams(historyToPush)
		setDateRange([item.selection])
	}

	return (
		<>
			<Helmet>
				<title>pomp | Search</title>
			</Helmet>

			<StyledSearch>
				<h1>Search</h1>

				<StyledSearchContainer>
					<DateRangeControl>
						<ClearDateButton onClick={clearDate}>
							Reset range
						</ClearDateButton>
						<StyledDateRange
							editableDateInputs
							retainEndDateOnFirstSelection
							moveRangeOnFirstSelection={false}
							ranges={dateRange}
							onChange={onDateRangeChange}
						/>
					</DateRangeControl>

					<StyledSearchControlContainer
						onSubmit={(event) => event.preventDefault()}
					>
						<SearchBar
							autoFocus
							type="text"
							ref={inputRef}
							value={searchInput}
							autoComplete="off"
							placeholder="Search"
							onChange={(event) =>
								setSearchInput(event.target.value)
							}
							onKeyPress={(event) => {
								event.key === "Enter" &&
									searchInput &&
									doSearch()
							}}
						/>
						{postCards.length}{" "}
						{postCards.length > 1 ? "results" : "result"}
						<TagSelect
							query={query}
							selectedTags={selectedTags}
							setSelectedOption={setSelectedOption}
						/>
					</StyledSearchControlContainer>
				</StyledSearchContainer>
			</StyledSearch>
			{postCards}
		</>
	)
}

export default Search
