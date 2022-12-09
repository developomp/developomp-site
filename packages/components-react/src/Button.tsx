import type { ReactNode } from "react"

export interface ButtonProps {
	children: ReactNode
}

export function Button(props: ButtonProps) {
	return <button>{props.children}</button>
}
