import "./style.css"

import { useMeta, useTitle } from "hoofd"
import { type FC } from "react"

const NotFound: FC = () => {
    useTitle("404")
    useMeta({ property: "og:title", content: "Page Not Found" })

    return (
        <>
            <h1 className="w-fit px-4 py-2 text-7xl dark:bg-dark-text-default dark:text-dark-ui-bg">
                404
            </h1>

            <h2
                className="glitch layers text-8xl"
                data-text="404 ERROR 404 ERROR"
            >
                Page Not Found
            </h2>
        </>
    )
}

export default NotFound
