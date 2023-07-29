import { type Metadata } from "next"

import Card from "@/components/Card"

export const metadata: Metadata = {
    metadataBase: new URL("https://blog.developomp.com"),
    title: "Page Not Found",
    openGraph: {
        title: "pomp's blog | Page Not Found",
    },
}

export default function NotFound() {
    return (
        <Card className="items-center gap-4">
            <h1 className="text-7xl">404</h1>
            Page not found :(
        </Card>
    )
}
