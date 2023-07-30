import dayjs from "dayjs"

import { testing } from "./getAge"

const { birth, getAge, ageInt, ageDecimal, isOverBirthDay } = testing

describe("getAge tests", () => {
    test("birthday to be 2002-07-30", () => {
        expect(birth).toEqual(dayjs("2002-07-30 00:00:00.000+09:00"))
    })

    test.each<{
        timestamp: string
        overBD: boolean
        year: number
        monthIndex: number
        date: number
    }>([
        {
            timestamp: "2022-12-31 00:00:00.000+09:00",
            overBD: true,
            year: 2022,
            monthIndex: 11,
            date: 31,
        },
        {
            timestamp: "2023-01-01 00:00:00.000+09:00",
            overBD: false,
            year: 2023,
            monthIndex: 0,
            date: 1,
        },
        {
            timestamp: "2023-07-29 00:00:00.000+09:00",
            overBD: false,
            year: 2023,
            monthIndex: 6,
            date: 29,
        },
        {
            timestamp: "2023-07-30 00:00:00.000+09:00",
            overBD: true,
            year: 2023,
            monthIndex: 6,
            date: 30,
        },
        {
            timestamp: "2023-07-31 00:00:00.000+09:00",
            overBD: true,
            year: 2023,
            monthIndex: 6,
            date: 31,
        },
        {
            timestamp: "2023-12-31 00:00:00.000+09:00",
            overBD: true,
            year: 2023,
            monthIndex: 11,
            date: 31,
        },
        {
            timestamp: "2024-01-01 00:00:00.000+09:00",
            overBD: false,
            year: 2024,
            monthIndex: 0,
            date: 1,
        },
    ])("isOverBirthDay to work ($timestamp)", (testData) => {
        const date = dayjs(testData.timestamp)

        expect(date.year()).toEqual(testData.year)
        expect(date.month()).toEqual(testData.monthIndex)
        expect(date.date()).toEqual(testData.date)
        expect(isOverBirthDay(date)).toEqual(testData.overBD)
    })

    test("ageInt to work", () => {
        expect(ageInt(birth)).toEqual(0)
        expect(ageInt(dayjs("2023-07-29"))).toEqual(20)
        expect(ageInt(dayjs("2023-07-30"))).toEqual(21)
        expect(ageInt(dayjs("2023-07-31"))).toEqual(21)
    })

    test("ageDecimal to work", () => {
        expect(ageDecimal(dayjs("2023-07-29 00:00:00.000+09:00"))).toEqual(
            0.9972602739726028
        )
        expect(ageDecimal(dayjs("2023-07-30 00:00:00.000+09:00"))).toEqual(0)
        expect(ageDecimal(dayjs("2023-07-31 00:00:00.000+09:00"))).toEqual(
            0.00273224043715847
        )
    })

    test("getAge to work", () => {
        expect(getAge(dayjs("2002-07-30 00:00:00.000+09:00"))).toEqual(0.0)
        expect(getAge(dayjs("2023-07-29 00:00:00.000+09:00"))).toEqual(
            20.997260273972604
        )
        expect(getAge(dayjs("2023-07-30 00:00:00.000+09:00"))).toEqual(21.0)
        expect(getAge(dayjs("2023-07-31 00:00:00.000+09:00"))).toEqual(
            21.002732240437158
        )
    })
})
