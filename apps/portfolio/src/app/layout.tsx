import "@fortawesome/fontawesome-svg-core/styles.css"
import "@fontsource/noto-sans-kr/400.css"
import "@fontsource/noto-sans-kr/700.css"
import "@fontsource/source-code-pro"
import "@developomp-site/blog/src/styles/anchor.scss"
import "@developomp-site/blog/src/styles/blockQuote.scss"
import "@developomp-site/blog/src/styles/button.scss"
import "@developomp-site/blog/src/styles/callout.scss"
import "@developomp-site/blog/src/styles/checkbox.scss"
import "@developomp-site/blog/src/styles/code.scss"
import "@developomp-site/blog/src/styles/colorChip.scss"
import "@developomp-site/blog/src/styles/heading.scss"
import "@developomp-site/blog/src/styles/hr.scss"
import "@developomp-site/blog/src/styles/img.scss"
import "@developomp-site/blog/src/styles/katex.scss"
import "@developomp-site/blog/src/styles/kbd.scss"
import "@developomp-site/blog/src/styles/list.scss"
import "@developomp-site/blog/src/styles/mark.scss"
import "@developomp-site/blog/src/styles/scrollbar.scss"
import "@developomp-site/blog/src/styles/subSup.scss"
import "@developomp-site/blog/src/styles/table.scss"
import "./global.scss"

import { type Metadata } from "next"
import Image from "next/image"

import Header from "@/components/Header"

export const metadata: Metadata = {
    metadataBase: new URL("https://portfolio.developomp.com"),
    title: {
        template: "pomp's portfolio | %s",
        default: "",
    },
    description: "developomp's portfolio",
    openGraph: {
        title: "pomp's portfolio",
        siteName: "developomp's portfolio",
        description: "developomp's portfolio",
        type: "website",
        url: "https://portfolio.developomp.com",
        images: "https://portfolio.developomp.com/favicon.svg",
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
            </head>

            <body>
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
                <div className="mb-10 mt-20 w-full max-w-screen-md px-4">
                    {children}
                </div>
            </body>
        </html>
    )
}
