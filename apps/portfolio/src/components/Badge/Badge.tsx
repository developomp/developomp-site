import "./style.scss"

import { type Badge as BadgeType } from "@developomp-site/content/src/types/types"

interface BadgeProps {
    slug: string
}

export default async function Badge({ slug }: BadgeProps) {
    const badgeData: BadgeType = await import(
        `@developomp-site/content/dist/icons/${slug}.json`
    )

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
