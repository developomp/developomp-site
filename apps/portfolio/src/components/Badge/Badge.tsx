import "./style.scss"

import { type Badge as BadgeType } from "@developomp-site/blog-content/src/types/types"
import { type FC, useEffect, useState } from "react"

interface BadgeProps {
    slug: string
}

const Badge: FC<BadgeProps> = ({ slug }) => {
    const [badgeData, setBadgeData] = useState<BadgeType | undefined>(undefined)

    useEffect(() => {
        ;(async () => {
            setBadgeData(
                await import(
                    `@developomp-site/blog-content/dist/icons/${slug}.json`
                )
            )
        })()
    }, [slug])

    if (!badgeData)
        return (
            <div className="mb-2 mr-2 flex w-fit items-center px-2 py-1 text-xs">
                <div className="badge mr-1 inline-block w-6 align-middle" />
                <span>Loading...</span>
            </div>
        )

    return (
        <div
            style={{ backgroundColor: badgeData.hex }}
            className={`mb-2 mr-2 flex w-fit items-center px-2 py-1 text-xs ${
                badgeData.isDark
                    ? "text-dark-text-default"
                    : "text-light-text-default"
            }`}
        >
            <div
                className={`${
                    badgeData.isDark ? "dark-badge" : "light-badge"
                } badge mr-1 inline-block w-6 align-middle`}
                dangerouslySetInnerHTML={{ __html: badgeData.svg }}
            />
            <span>{badgeData.title}</span>
        </div>
    )
}

export default Badge
