import type { Metadata } from "next"

import Home from "./Home"

export const metadata: Metadata = {
    metadataBase: new URL("https://blog.pompy.dev"),
    title: "pomp's blog | Home",
}

export default function Page() {
    return <Home />
}
