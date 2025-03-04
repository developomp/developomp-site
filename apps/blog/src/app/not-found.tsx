import { type Metadata } from "next"

import Card from "@/components/Card"
import titlePrefix from "@/titlePrefix"

export const metadata: Metadata = {
    metadataBase: new URL("https://blog.pompy.dev"),
    title: "Page Not Found",
    openGraph: {
        title: titlePrefix + "Page Not Found",
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
