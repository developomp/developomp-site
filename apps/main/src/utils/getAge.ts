// my birthday :D
const birthYear = 2002
const birthMonth = 7
const birthDate = 30

export default function getAge(): number {
    const now = Date.now()
    const date = new Date()
    const year = date.getFullYear()

    // integer calculation

    const isOverBirthDay =
        birthMonth > date.getMonth() + 1 ||
        (birthMonth === date.getMonth() + 1 && birthDate >= date.getDate())
    const ageInt = year - birthYear - (isOverBirthDay ? 1 : 0)

    // decimal calculation

    const msThisYear = Date.UTC(year, 0, 0)
    const msThisBD = Date.UTC(year, birthMonth - 1, birthDate)
    // number of milliseconds since the beginning of this year
    const msSinceThisYear = now - msThisYear
    // number of milliseconds from the beginning of this year to my birthday
    const msToBD = msThisBD - msThisYear
    const ageDecimal = msSinceThisYear / msToBD

    return ageInt + ageDecimal
}
