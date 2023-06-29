import { useTitle } from "hoofd"
import { type FC } from "react"

import Loading from "@/components/Loading"

const LoadingPage: FC = () => {
    useTitle("Loading")

    return <Loading />
}

export default LoadingPage
