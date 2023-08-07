import "./style.scss"

import { type Badge as BadgeType } from "@developomp-site/content/src/types/types"

interface BadgeProps {
    slug: string
}

const sharedBadgeStyles = "flex w-fit items-center px-2 py-1 text-xs"
const sharedInnerBadgeStyles = "badge mr-1 inline-block w-6 align-middle"

export default async function Badge({ slug }: BadgeProps) {
    const badgeData: BadgeType = await import(
        `@developomp-site/content/dist/icons/${slug}.json`
    )

    if (!badgeData)
        return (
            <div className={sharedBadgeStyles}>
                <div className={sharedInnerBadgeStyles} />
                <span>Loading...</span>
            </div>
        )

    return (
        <div
            style={{ backgroundColor: badgeData.hex }}
            className={`${sharedBadgeStyles} ${
                badgeData.isDark
                    ? "text-dark-text-default"
                    : "text-light-text-default"
            }`}
        >
            <div
                className={`${sharedInnerBadgeStyles} ${
                    badgeData.isDark ? "dark-badge" : "light-badge"
                }`}
                dangerouslySetInnerHTML={{ __html: badgeData.svg }}
            />
            <span>{badgeData.title}</span>
        </div>
    )
}
