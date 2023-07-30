import dayjs from "dayjs"
import timezone from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"

import { testing } from "./getAge"

dayjs.extend(utc)
dayjs.extend(timezone)

dayjs.tz.setDefault("Asia/Seoul")

const { birth, getAge, ageInt, ageDecimal, isOverBirthDay } = testing

describe("getAge tests", () => {
    test("birthday to be 2002-07-30", () => {
        expect(birth).toEqual(dayjs.tz("2002-07-30"))
    })

    test.each<{
        timestamp: string
        overBD: boolean
        year: number
        monthIndex: number
        date: number
    }>([
        {
            timestamp: "2022-12-31",
            overBD: true,
            year: 2022,
            monthIndex: 11,
            date: 31,
        },
        {
            timestamp: "2023-01-01",
            overBD: false,
            year: 2023,
            monthIndex: 0,
            date: 1,
        },
        {
            timestamp: "2023-07-29",
            overBD: false,
            year: 2023,
            monthIndex: 6,
            date: 29,
        },
        {
            timestamp: "2023-07-30",
            overBD: true,
            year: 2023,
            monthIndex: 6,
            date: 30,
        },
        {
            timestamp: "2023-07-31",
            overBD: true,
            year: 2023,
            monthIndex: 6,
            date: 31,
        },
        {
            timestamp: "2023-12-31",
            overBD: true,
            year: 2023,
            monthIndex: 11,
            date: 31,
        },
        {
            timestamp: "2024-01-01",
            overBD: false,
            year: 2024,
            monthIndex: 0,
            date: 1,
        },
    ])("isOverBirthDay to work ($timestamp)", (testData) => {
        const date = dayjs.tz(testData.timestamp)

        expect(date.year()).toEqual(testData.year)
        expect(date.month()).toEqual(testData.monthIndex)
        expect(date.date()).toEqual(testData.date)
        expect(isOverBirthDay(date)).toEqual(testData.overBD)
    })

    test.each<[string, number]>([
        ["2002-07-30", 0],
        ["2023-07-29", 20],
        ["2023-07-30", 21],
        ["2023-07-31", 21],
    ])("ageInt to work for '%s'", (date, expected) => {
        expect(ageInt(dayjs.tz(date))).toEqual(expected)
    })

    test.each<[string, number]>([
        ["2023-07-29", 0.9972602739726028],
        ["2023-07-30", 0.0],
        ["2023-07-31", 0.00273224043715847],
    ])("ageDecimal to work for '%s'", (date, expected) => {
        expect(ageDecimal(dayjs.tz(date))).toEqual(expected)
        expect(ageDecimal(dayjs.tz(date))).toBeGreaterThanOrEqual(0.0)
        expect(ageDecimal(dayjs.tz(date))).toBeLessThan(1.0)
    })

    test.each<[string, number]>([
        ["2002-07-30", 0.0],
        ["2023-07-29", 20.997260273972604],
        ["2023-07-30", 21.0],
        ["2023-07-31", 21.002732240437158],
    ])("getAge to work for '%s'", (date, expected) => {
        expect(getAge(dayjs.tz(date))).toEqual(expected)
    })
})
