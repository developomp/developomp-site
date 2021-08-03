import { useEffect, useState } from "react"
import styled from "styled-components"
import { useLocation, useHistory } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { DateRange } from "react-date-range"
import queryString from "query-string" // parsing url query
import elasticlunr from "elasticlunr" // search engine

import map from "../data/map.json"
import searchIndex from "../data/search.json"
import theming from "../theming"

import "react-date-range/dist/styles.css"
import "react-date-range/dist/theme/default.css"

import Tag from "../components/Tag"
import TagList from "../components/TagList"
import PostCard from "../components/PostCard"

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

// todo: find ways to get rid of wrapper component
export default function Search() {
	return <_Search />
}

// have to be in a separate component for tags to update when the urls change
// todo: check if using keys will allow me to use class components
function _Search() {
	const [index, setIndex] = useState({} as elasticlunr.Index<unknown>)

	useEffect(() => setIndex(elasticlunr.Index.load(searchIndex as never)), [])

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

	const [postCards, setPostCards] = useState<unknown[]>([])

	const [searchInput, setSearchInput] = useState("")

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
						<input
							type="text"
							onChange={(event) =>
								setSearchInput(event.target.value)
							}
						/>
						<br />
						<br />
						<small>
							<TagList>
								{query.tags?.map((tag) => {
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
						<br />
						<button
							onClick={() => {
								try {
									const _postCards: unknown[] = []
									for (const res of index.search(
										searchInput
									)) {
										if (map.posts[res.ref]) {
											_postCards.push(
												<PostCard
													key={res.ref}
													postData={{
														url: res.ref,
														...map.posts[res.ref],
													}}
												/>
											)
										}
										setPostCards(_postCards)
									}

									// eslint-disable-next-line no-empty
								} catch (err) {}
							}}
						>
							Search
						</button>
					</StyledSearchControlContainer>
				</StyledSearchContainer>
			</StyledSearch>
			{postCards}
		</>
	)
}
