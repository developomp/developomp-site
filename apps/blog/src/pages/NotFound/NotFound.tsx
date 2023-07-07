import { useMeta, useTitle } from "hoofd"

import Card from "@/components/Card"

export default function NotFound() {
    useTitle("404")
    useMeta({ property: "og:title", content: "pomp's blog | Page Not Found" })

    return (
        <Card className="items-center gap-4">
            <h1 className="text-7xl">404</h1>
            Page not found :(
        </Card>
    )
}
