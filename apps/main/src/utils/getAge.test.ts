import { testing } from "./getAge"

const { birth, dateFormatOption, getAge, ageInt, ageDecimal, isOverBirthDay } =
    testing

describe("getAge tests", () => {
    test("birthday should be 2002-07-30", () => {
        expect(birth).toEqual(new Date("2002-07-30, 00:00:00.000 +09:00"))
    })

    test("isOverBirthDay to work", () => {
        expect(
            isOverBirthDay(new Date("2022-12-31, 00:00:00.000 +09:00"))
        ).toEqual(true)

        expect(
            isOverBirthDay(new Date("2023-01-01, 00:00:00.000 +09:00"))
        ).toEqual(false)

        //

        expect(
            isOverBirthDay(new Date("2023-07-29, 00:00:00.000 +09:00"))
        ).toEqual(false)

        expect(
            isOverBirthDay(new Date("2023-07-30, 00:00:00.000 +09:00"))
        ).toEqual(true)

        expect(
            isOverBirthDay(new Date("2023-07-31, 00:00:00.000 +09:00"))
        ).toEqual(true)

        //

        expect(
            isOverBirthDay(new Date("2023-12-31, 00:00:00.000 +09:00"))
        ).toEqual(true)

        expect(
            isOverBirthDay(new Date("2024-01-01, 00:00:00.000 +09:00"))
        ).toEqual(false)
    })

    test("dateFormatOption should work properly", () => {
        expect(
            new Date("2002-07-30, 00:00:00.000 +09:00").toLocaleString(
                "en-US",
                dateFormatOption
            )
        ).toEqual("7/30/2002, 00:00:00.000 GMT+09:00")
    })

    test("ageInt to work", () => {
        expect(ageInt(birth)).toEqual(0)
        expect(ageInt(new Date("2023-07-29"))).toEqual(20)
        expect(ageInt(new Date("2023-07-30"))).toEqual(21)
        expect(ageInt(new Date("2023-07-31"))).toEqual(21)
    })

    test("ageDecimal to work", () => {
        expect(ageDecimal(new Date("2023-07-29, 00:00:00.000 +09:00"))).toEqual(
            0.9972602739726028
        )
        expect(ageDecimal(new Date("2023-07-30, 00:00:00.000 +09:00"))).toEqual(
            0
        )
        expect(ageDecimal(new Date("2023-07-31, 00:00:00.000 +09:00"))).toEqual(
            0.00273224043715847
        )
    })

    test("getAge to work", () => {
        expect(getAge(new Date("2002-07-30, 00:00:00.000 +09:00"))).toEqual(0.0)
        expect(getAge(new Date("2023-07-29, 00:00:00.000 +09:00"))).toEqual(
            20.997260273972604
        )
        expect(getAge(new Date("2023-07-30, 00:00:00.000 +09:00"))).toEqual(
            21.0
        )
        expect(getAge(new Date("2023-07-31, 00:00:00.000 +09:00"))).toEqual(
            21.002732240437158
        )
    })
})
