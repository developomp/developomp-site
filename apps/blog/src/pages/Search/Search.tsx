import { useCallback, useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { useSearchParams } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { Range } from "react-date-range"

import elasticlunr from "elasticlunr" // search engine

import _map from "../../data/map.json"
import searchData from "../../data/search.json"

import Loading from "../../components/Loading"
import PostCard from "../../components/PostCard"
import MainContent from "../../components/MainContent"

import SearchBar from "./SearchBar"
import TagSelect, { TagsData } from "./TagSelect"
import { ClearDateButton, DateRangeControl, StyledDateRange } from "./DateRange"
import { globalContext } from "../../globalContext"

import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"

import type { Map } from "../../../types/types"

const map: Map = _map

const searchIndex = elasticlunr.Index.load(searchData as never)

export interface SearchParams {
	date_from: string
	date_to: string
	tags: string[]
	query: string
}

const defaultDateRange = [
	{
		startDate: undefined,
		endDate: undefined,
		key: "selection",
	},
]

const StyledSearch = styled(MainContent)`
	text-align: center;
	margin-bottom: 2rem;
`

const StyledSearchContainer = styled.div`
	display: flex;
	align-items: flex-start;

	@media screen and (max-width: ${(props) =>
			props.theme.theme.maxDisplayWidth.mobile}) {
		flex-direction: column-reverse;
		align-items: center;
	}
`

const StyledSearchControlContainer = styled.div`
	width: 100%;
	margin-left: 1rem;

	@media screen and (max-width: ${(props) =>
			props.theme.theme.maxDisplayWidth.mobile}) {
		margin-top: 2rem;
		margin-left: 0;
	}
`

// check if post date is withing the range
function isDateInRange(dateStringToCompare: string, range: Range): boolean {
	if (!dateStringToCompare) throw Error("No date to compare")
	const dateToCompare = new Date(dateStringToCompare)
	const { startDate, endDate } = range

	const startDateExists = !!startDate
	const endDateExists = !!endDate

	if (endDateExists && !startDateExists) return dateToCompare < endDate
	if (startDateExists && !endDateExists) return dateToCompare > startDate
	if (startDateExists && endDateExists)
		return dateToCompare > startDate && dateToCompare < endDate

	return true
}

function isSelectedTagsInPost(selectedTags?: TagsData[], postTags?: string[]) {
	if (!selectedTags || selectedTags.length <= 0) return true
	if (!postTags || postTags.length <= 0) return false

	// if tag is empty or undefined
	const tagValues = selectedTags.map((value) => value.value)
	if (!postTags.every((val) => tagValues.includes(val))) return false

	return true
}

const Search = () => {
	const { globalState } = useContext(globalContext)
	const locale = globalState.locale

	// URL search parameters
	const [URLSearchParams, setURLSearchParams] = useSearchParams()

	const [initialized, setInitialized] = useState(false)

	const [dateRange, setDateRange] = useState<Range[]>(defaultDateRange)
	const [selectedTags, setSelectedTags] = useState<TagsData[]>([])
	const [searchInput, setSearchInput] = useState("")

	const [postCards, setPostCards] = useState<JSX.Element[]>([])

	const doSearch = useCallback(() => {
		try {
			const _postCards: JSX.Element[] = []
			for (const res of searchIndex.search(searchInput)) {
				const postData = map.posts[res.ref]

				if (
					postData && // if post data exists
					isDateInRange(postData.date, dateRange[0]) && // date is within range
					isSelectedTagsInPost(selectedTags, postData.tags) // if post include tags
				) {
					_postCards.push(
						<PostCard
							key={res.ref}
							postData={{
								content_id: res.ref,
								...postData,
							}}
						/>
					)
				}
			}

			// apply search result
			setPostCards(_postCards)

			// eslint-disable-next-line no-empty
		} catch (err) {
			console.error(err)
		}
	}, [dateRange, selectedTags, searchInput])

	// parse search parameters
	useEffect(() => {
		for (const [key, value] of URLSearchParams.entries()) {
			switch (key) {
				case "date_from":
					setDateRange((prev) => [{ ...prev[0], startDate: new Date(value) }])
					break

				case "date_to":
					setDateRange((prev) => [{ ...prev[0], endDate: new Date(value) }])
					break

				case "tags":
					setSelectedTags(
						value.split(",").map((elem) => {
							return { value: elem, label: elem }
						})
					)
					break

				case "query":
					setSearchInput(value)
					break
			}
		}

		setInitialized(true)
	}, [])

	// update URL when data changes
	useEffect(() => {
		if (!initialized) return

		let date_from
		let date_to

		// convert Date to YYYY-MM-DD string if it exists
		if (dateRange[0].startDate)
			date_from = dateRange[0].startDate.toISOString().split("T")[0]

		if (dateRange[0].endDate)
			date_to = dateRange[0].endDate.toISOString().split("T")[0]

		setURLSearchParams({
			...(date_from && {
				date_from: date_from,
			}),
			...(date_to && {
				date_to: date_to,
			}),
			...(selectedTags.length > 0 && {
				tags: selectedTags.map((value) => value.value).join(","),
			}),
			...(searchInput && {
				query: searchInput,
			}),
		})
	}, [dateRange, selectedTags, searchInput])

	// run search if date range and selected tags change
	useEffect(() => {
		doSearch()
	}, [dateRange, selectedTags])

	// run search if user stops typing
	useEffect(() => {
		const delayDebounceFn = setTimeout(() => {
			doSearch()
		}, 200)

		return () => clearTimeout(delayDebounceFn)
	}, [searchInput])

	if (!initialized) return <Loading />

	return (
		<>
			<Helmet>
				<title>pomp | {locale == "en" ? "Search" : "검색"}</title>
			</Helmet>

			<StyledSearch>
				<h1>{locale == "en" ? "Search" : "검색"}</h1>

				<StyledSearchContainer>
					<DateRangeControl>
						<ClearDateButton
							onClick={() => {
								setDateRange(defaultDateRange)
							}}
						>
							{locale == "en" ? "Reset date range" : "날짜 범위 초기화"}
						</ClearDateButton>
						<StyledDateRange
							editableDateInputs
							retainEndDateOnFirstSelection
							moveRangeOnFirstSelection={false}
							ranges={dateRange}
							onChange={(rangesByKey) => {
								setDateRange([rangesByKey.selection])
							}}
						/>
					</DateRangeControl>

					<StyledSearchControlContainer
						onSubmit={(event) => event.preventDefault()}
					>
						<SearchBar
							autoFocus
							type="search"
							value={searchInput}
							autoComplete="off"
							placeholder={locale == "en" ? "Search" : "검색"}
							onChange={(event) => setSearchInput(event.target.value)}
							onKeyPress={(event) => {
								event.key === "Enter" && searchInput && doSearch()
							}}
						/>
						{locale == "kr" && "결과: "}
						{postCards.length}{" "}
						{locale == "en" && (postCards.length > 1 ? "results" : "result")}
						<TagSelect
							defaultValue={selectedTags}
							onChange={(newValue) => {
								setSelectedTags(newValue as TagsData[])
							}}
						/>
					</StyledSearchControlContainer>
				</StyledSearchContainer>
			</StyledSearch>

			{postCards}
		</>
	)
}

export default Search