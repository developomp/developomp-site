import "@fortawesome/fontawesome-svg-core/styles.css"
import "@fontsource/noto-sans-kr/400.css"
import "@fontsource/noto-sans-kr/700.css"
import "@fontsource/source-code-pro"
import "katex/dist/katex.min.css"
import "./globals.css"
import "../styles/global.scss"
import "../styles/anchor.scss"
import "../styles/blockQuote.scss"
import "../styles/button.scss"
import "../styles/callout.scss"
import "../styles/checkbox.scss"
import "../styles/code.scss"
import "../styles/colorChip.scss"
import "../styles/heading.scss"
import "../styles/hr.scss"
import "../styles/img.scss"
import "../styles/katex.scss"
import "../styles/kbd.scss"
import "../styles/list.scss"
import "../styles/mark.scss"
import "../styles/scrollbar.scss"
import "../styles/subSup.scss"
import "../styles/table.scss"
import "../styles/theme-visibility.scss"

import { type Metadata } from "next"
import Image from "next/image"

import Footer from "@/components/Footer"
import Header from "@/components/Header"

export const metadata: Metadata = {
    metadataBase: new URL("https://blog.developomp.com"),
    title: {
        template: "pomp's blog | %s",
        default: "",
    },
    description: "developomp's Blog",
    openGraph: {
        title: "pomp's blog",
        siteName: "developomp's Blog",
        description: "developomp's Blog",
        type: "website",
        url: "https://blog.developomp.com",
        images: "https://blog.developomp.com/favicon.svg",
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className="dark">
            <head>
                <link
                    rel="shortcut icon"
                    type="image/svg+xml"
                    href="/favicon.svg"
                />
                <meta name="theme-color" content="#000000" />
                <script
                    async
                    defer
                    src="/stats/script.js"
                    data-website-id="aa2eb701-74e2-4d81-ad27-9de6850b7f50"
                ></script>
            </head>

            <body className="overflow-x-hidden overflow-y-scroll">
                <noscript>
                    <figure>
                        <Image
                            src="/img/nojs.avif"
                            height={500}
                            width={544}
                            alt="No javascript?"
                        />
                        <figcaption>
                            Image compressed down to 4.5kB because you probably
                            have potato internet :D
                        </figcaption>
                    </figure>
                </noscript>

                <Header />
                <main className="mx-auto mb-8 mt-20 flex w-full max-w-screen-mobile grow flex-col items-center gap-8 px-4">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    )
}
