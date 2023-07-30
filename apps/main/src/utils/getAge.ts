import dayjs, { type Dayjs } from "dayjs"

// my birthday in KST :D
const birth = dayjs("2002-07-30 00:00:00.000+09:00")

/**
 * Gets developomp's age with decimal precision
 *
 * @param now - current `Date` in KST
 */
export default function getAge(now: Dayjs = dayjs()): number {
    return ageInt(now) + ageDecimal(now)
}

/**
 * Calculates the integer component of the age
 */
function ageInt(now: Dayjs): number {
    return now.year() - birth.year() - (isOverBirthDay(now) ? 0 : 1)
}

/**
 * Calculates the decimal component of the age
 */
function ageDecimal(now: Dayjs): number {
    // millisecond timestamp of my last birthday
    const BDPrev = birth
        .year(now.year() - (isOverBirthDay(now) ? 0 : 1))
        .valueOf()

    // millisecond timestamp of my upcoming birthday
    const BDNext = birth
        .year(now.year() + (isOverBirthDay(now) ? 1 : 0))
        .valueOf()

    // milliseconds since my last birthday
    const msSinceLastBD = now.valueOf() - BDPrev

    return msSinceLastBD / (BDNext - BDPrev)
}

/**
 * tests if today is at or after this year's birthday
 *
 * ...| Dec 31 | Jan 1 | ... | July 29 | Jul 30 | July 31 | ... | Dec 31 | Jan 1 | ...
 * ...|  true  | false | ... |  false  |  true  |  true   | ... |  true  | false | ...
 */
function isOverBirthDay(now: Dayjs): boolean {
    if (birth.month() < now.month()) return true

    if (birth.month() === now.month() && birth.date() <= now.date()) return true

    return false
}

export const testing = {
    birth,
    getAge,
    ageInt,
    ageDecimal,
    isOverBirthDay,
}
