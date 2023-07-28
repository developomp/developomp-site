import { type Metadata } from "next"

export const metadata: Metadata = {
    metadataBase: new URL("https://portfolio.developomp.com"),
    title: "404",
    openGraph: {
        title: "pomp's portfolio | Page Not Found",
    },
}

export default function NotFound() {
    return (
        <>
            <h1 className="w-fit px-4 py-2 text-5xl dark:bg-dark-text-default dark:text-dark-ui-bg">
                404
            </h1>

            <h2 className="glitch layers text-5xl">Page Not Found</h2>
        </>
    )
}
