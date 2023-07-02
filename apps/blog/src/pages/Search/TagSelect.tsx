import { useContext } from "react"
import Select from "react-select"
import styled from "styled-components"

import contentMap from "../../contentMap"
import { globalContext } from "../../globalContext"

const StyledReactTagsContainer = styled.div`
    width: 100%;
    margin-top: 1.5rem;
`

export interface TagsData {
    value: string
    label: string
}

const options: TagsData[] = contentMap.meta.tags.map((elem) => ({
    value: elem,
    label: elem,
}))

interface TagSelectProps {
    defaultValue: TagsData[]
    onChange(newValue: unknown): void
}

const TagSelect = (props: TagSelectProps) => {
    const { globalState } = useContext(globalContext)
    const { theme } = globalState
    const { onChange, defaultValue: selectedTags } = props

    return (
        <StyledReactTagsContainer>
            <Select
                placeholder="Select tags..."
                theme={(reactSelectTheme) => ({
                    ...reactSelectTheme,
                    colors: {
                        ...reactSelectTheme.colors,
                        neutral0:
                            theme.component.input.color.background.default,
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
                        backgroundColor:
                            theme.component.input.color.background.default,
                        color: theme.color.text.default,
                        cursor: "pointer",
                        ":hover": {
                            backgroundColor:
                                theme.component.input.color.background
                                    .itemHover,
                        },
                    }),
                    control: (styles) => ({
                        ...styles,
                        backgroundColor:
                            theme.component.input.color.background.default,
                        border: `1px solid ${theme.component.input.color.border.default}`,
                        ":hover": {
                            border: `1px solid ${theme.component.input.color.border.hover}`,
                        },
                        ":focus": {
                            border: `1px solid ${theme.component.input.color.border.focus}`,
                        },
                    }),
                    multiValue: (styles) => ({
                        ...styles,
                        color: theme.color.text.default,
                        backgroundColor:
                            theme.component.ui.color.background.default,
                        borderRadius: "10px",
                    }),
                    multiValueLabel: (styles) => ({
                        ...styles,
                        color: theme.color.text.default,
                        marginLeft: "0.2rem",
                    }),
                    multiValueRemove: (styles) => ({
                        ...styles,
                        marginRight: "0.3rem",
                        cursor: "pointer",
                        color: theme.component.input.color.placeHolder,
                        ":hover": {
                            color: theme.color.text.default,
                        },
                    }),
                }}
                defaultValue={selectedTags}
                onChange={onChange}
                options={options}
                isMulti
            />
        </StyledReactTagsContainer>
    )
}

export default TagSelect
