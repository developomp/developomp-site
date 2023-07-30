const dateFormatOption: Intl.DateTimeFormatOptions = {
    timeZone: "Asia/Seoul",
    timeZoneName: "longOffset",
    hourCycle: "h23",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    fractionalSecondDigits: 3,
}

// my birthday in KST :D
const birth = new Date(
    new Date("2002-07-30, 00:00:00.000 +09:00").toLocaleString(
        "en-US",
        dateFormatOption
    )
)

/**
 * Gets developomp's age with decimal precision
 *
 * @param now - current `Date` in KST
 */
export default function getAge(
    now: Date = new Date(new Date().toLocaleString("en-US", dateFormatOption))
): number {
    return ageInt(now) + ageDecimal(now)
}

/**
 * Calculates the integer component of the age
 */
function ageInt(now: Date): number {
    return (
        now.getFullYear() - birth.getFullYear() - (isOverBirthDay(now) ? 0 : 1)
    )
}

/**
 * Calculates the decimal component of the age
 */
function ageDecimal(now: Date): number {
    // millisecond timestamp of my last birthday
    const BDPrev = new Date(birth).setFullYear(
        now.getFullYear() - (isOverBirthDay(now) ? 0 : 1)
    )

    // millisecond timestamp of my upcoming birthday
    const BDNext = new Date(birth).setFullYear(
        now.getFullYear() + (isOverBirthDay(now) ? 1 : 0)
    )

    // milliseconds since my last birthday
    const msSinceLastBD = now.getTime() - BDPrev

    return msSinceLastBD / (BDNext - BDPrev)
}

/**
 * tests if today is at or after this year's birthday
 *
 * ...| Dec 31 | Jan 1 | ... | July 29 | Jul 30 | July 31 | ... | Dec 31 | Jan 1 | ...
 * ...|  true  | false | ... |  false  |  true  |  true   | ... |  true  | false | ...
 */
function isOverBirthDay(now: Date): boolean {
    if (birth.getMonth() < now.getMonth()) return true

    if (birth.getMonth() === now.getMonth() && birth.getDate() <= now.getDate())
        return true

    return false
}

export const testing = {
    birth,
    dateFormatOption,
    getAge,
    ageInt,
    ageDecimal,
    isOverBirthDay,
}
