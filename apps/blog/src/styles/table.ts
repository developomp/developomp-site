import { css } from "styled-components"

export default css`
    table {
        border-collapse: collapse;
        border-spacing: 0;
        width: 100%;

        td,
        th {
            padding: 8px;
            border: 1px solid
                ${({ theme }) => theme.theme.component.table.color.border};
        }

        /* table alternating color */
        tr:nth-child(even) {
            background-color: ${({ theme }) =>
                theme.theme.component.table.color.even};
        }
    }
`
