/* eslint-disable react/prop-types */

import { useEffect, useState, useRef } from "react"
import styled, { ThemeConsumer } from "styled-components"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { DateRange, Range } from "react-date-range"
import Select from "react-select"
import queryString from "query-string" // parsing url query
import elasticlunr from "elasticlunr" // search engine

import _map from "../data/map.json"
import searchData from "../data/search.json"
import theming from "../styles/theming"

import PostCard from "../components/PostCard"
import MainContent from "../components/MainContent"

import { Map } from "../types/typings"

import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"

const map: Map = _map

const searchIndex = elasticlunr.Index.load(searchData as never)

interface TagsData {
	value: string
	label: string
}

interface Query {
	from: string
	to: string
	tags: string[]
	query: string
}

const StyledSearch = styled(MainContent)`
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

const StyledReactTagsContainer = styled.div`
	width: 100%;
`

const ClearDateButton = styled.button`
	width: 100%;
	line-height: 2.5rem;
	border: none;
	cursor: pointer;

	background-color: tomato; /* 🍅 mmm tomato 🍅 */
	color: white;
	font-weight: bold;
`

const options: TagsData[] = [
	...map.meta.tags.map((elem) => ({ value: elem, label: elem })),
]

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
					<div>
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
					</div>

					<StyledSearchControlContainer
						onSubmit={(event) => event.preventDefault()}
					>
						<StyledSearchBar
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
						<h3>Tags</h3>
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

interface TagSelectProps {
	query: Query
	selectedTags?: TagsData[]
	setSelectedOption: React.Dispatch<
		React.SetStateAction<TagsData[] | undefined>
	>
}

const TagSelect: React.FC<TagSelectProps> = ({
	query,
	selectedTags,
	setSelectedOption,
}) => {
	const navigate = useNavigate()
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [_, setSearchParams] = useSearchParams()

	return (
		<StyledReactTagsContainer>
			<ThemeConsumer>
				{(currentTheme) => (
					<Select
						theme={(theme) => ({
							...theme,
							colors: {
								...theme.colors,
								neutral0: theming
									.theme(currentTheme.currentTheme, {
										light: theming.light.backgroundColor1,
										dark: theming.dark.backgroundColor1,
									})
									.toString(),
								neutral5: "hsl(0, 0%, 20%)",
								neutral10: "hsl(0, 0%, 30%)",
								neutral20: "hsl(0, 0%, 40%)",
								neutral30: "hsl(0, 0%, 50%)",
								neutral40: "hsl(0, 0%, 60%)",
								neutral50: "hsl(0, 0%, 70%)",
								neutral60: "hsl(0, 0%, 80%)",
								neutral70: "hsl(0, 0%, 90%)",
								neutral80: "hsl(0, 0%, 95%)",
								neutral90: "hsl(0, 0%, 100%)",
								primary25: "hotpink",
								primary: "black",
							},
						})}
						styles={{
							option: (styles) => ({
								...styles,
								backgroundColor: theming
									.theme(currentTheme.currentTheme, {
										light: theming.light.backgroundColor1,
										dark: theming.dark.backgroundColor1,
									})
									.toString(),
								color: theming
									.theme(currentTheme.currentTheme, {
										light: theming.light.color1,
										dark: theming.dark.color1,
									})
									.toString(),
								cursor: "pointer",
								padding: 10,
								":hover": {
									backgroundColor: theming
										.theme(currentTheme.currentTheme, {
											light: theming.light
												.backgroundColor0,
											dark: theming.dark.backgroundColor0,
										})
										.toString(),
								},
							}),
							control: (styles) => ({
								...styles,
								backgroundColor: theming
									.theme(currentTheme.currentTheme, {
										light: theming.light.backgroundColor1,
										dark: theming.dark.backgroundColor1,
									})
									.toString(),
								border: theming.theme(
									currentTheme.currentTheme,
									{
										light: "1px solid #ccc",
										dark: "1px solid #555",
									}
								),
							}),
							multiValue: (styles) => ({
								...styles,
								color: "white",
								backgroundColor: theming.color.linkColor,
								borderRadius: "5px",
							}),
							multiValueLabel: (styles) => ({
								...styles,
								marginLeft: "0.2rem",
								marginRight: "0.2rem",
							}),
							multiValueRemove: (styles) => ({
								...styles,
								marginLeft: "0.2rem",
								":hover": {
									backgroundColor: "white",
									color: theming.color.linkColor,
								},
							}),
						}}
						defaultValue={selectedTags}
						onChange={(newSelectedTags) => {
							setSelectedOption(newSelectedTags as TagsData[])

							navigate("/search")

							const tags =
								newSelectedTags
									.map((elem) => elem.value)
									.join(",") || undefined

							setSearchParams({
								...(query.query && {
									query: query.query,
								}),
								...(query.from && {
									from: query.from,
								}),
								...(query.to && {
									to: query.to,
								}),
								...(tags && {
									tags: tags,
								}),
							})
						}}
						options={options}
						isMulti
					/>
				)}
			</ThemeConsumer>
		</StyledReactTagsContainer>
	)
}

export default Search
