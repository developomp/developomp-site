import type { ReactNode } from "react"

interface Props {
    children?: ReactNode | undefined
}

export default function TagList(props: Props) {
    return (
        <div className="flex flex-wrap justify-start gap-2">
            {props.children}
        </div>
    )
}
