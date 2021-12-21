import styled, { ThemeConsumer } from "styled-components"
import Select from "react-select"

import theming from "../../styles/theming"

import _map from "../../data/map.json"
import { Map } from "../../../types/typing"

const map: Map = _map

const StyledReactTagsContainer = styled.div`
	width: 100%;
	margin-top: 1.5rem;
`

export interface TagsData {
	value: string
	label: string
}

const options: TagsData[] = map.meta.tags.map((elem) => ({
	value: elem,
	label: elem,
}))

interface TagSelectProps {
	defaultValue: TagsData[]
	onChange(newValue: unknown): void
}

const TagSelect = (props: TagSelectProps) => {
	const { onChange, defaultValue: selectedTags } = props

	return (
		<StyledReactTagsContainer>
			<ThemeConsumer>
				{(currentTheme) => (
					<Select
						placeholder="Select tags..."
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
						onChange={onChange}
						options={options}
						isMulti
					/>
				)}
			</ThemeConsumer>
		</StyledReactTagsContainer>
	)
}

export default TagSelect
