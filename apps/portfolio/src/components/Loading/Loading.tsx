import "./style.scss"

import { type FC } from "react"

const Loading: FC = () => {
    return (
        <div className="loading flex animate-bounce flex-col items-center justify-center text-center">
            <h2 className="text-3xl">Loading...</h2>
        </div>
    )
}

export default Loading
