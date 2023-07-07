import { ReactNode } from "react"

interface Props {
    children?: ReactNode
    className?: string
}

export default function Card({ children, className }: Props) {
    return (
        <div
            className={`${className} flex h-fit w-full max-w-screen-mobile flex-col rounded-md bg-light-card-bg p-8 shadow-lg dark:bg-dark-card-bg`}
        >
            {children}
        </div>
    )
}
