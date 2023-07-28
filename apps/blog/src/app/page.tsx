import { Metadata } from "next"

import Home from "./Home"

export const metadata: Metadata = {
    metadataBase: new URL("https://blog.developomp.com"),
    title: "pomp's blog | Home",
}

export default function Page() {
    return <Home />
}
