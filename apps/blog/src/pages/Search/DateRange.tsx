import { DateRange } from "react-date-range"
import styled from "styled-components"

export const DateRangeControl = styled.div`
    width: 350px;

    @media screen and (max-width: ${(props) =>
            props.theme.theme.maxDisplayWidth.mobile}) {
        margin-top: 2rem;
    }
`

export const ClearDateButton = styled.button`
    width: 100%;
    height: 2.5rem;

    border: none;
    cursor: pointer;

    background-color: tomato; /* 🍅 mmm tomato 🍅 */
    color: white;
    font-weight: bold;
`

export const StyledDateRange = styled(DateRange)`
    width: 100%;
    height: 350px;
`
