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
import titlePrefix from "@/titlePrefix"

export const metadata: Metadata = {
    metadataBase: new URL("https://blog.pompy.dev"),
    title: {
        template: titlePrefix + "%s",
        default: "",
    },
    description: "pomp's Blog",
    openGraph: {
        title: "pomp's blog",
        siteName: "pomp's Blog",
        description: "pomp's Blog",
        type: "website",
        url: "https://blog.pompy.dev",
        images: "https://blog.pompy.dev/favicon.svg",
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
                    defer
                    src="https://umami.pompy.dev/script.js"
                    data-website-id="361a9f07-a09b-49a0-b7e4-f1fc7caff9e2"
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
