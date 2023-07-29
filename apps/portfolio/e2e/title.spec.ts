import { expect, test } from "@playwright/test"

const prefix = "pomp's portfolio | "

test("should have proper title", async ({ page }) => {
    await page.goto("/")
    expect(await page.title()).toEqual(`${prefix}Home`)

    await page.goto("/project/developomp-site")
    expect(await page.title()).toEqual(`${prefix}developomp-site`)

    await page.goto("/404")
    expect(await page.title()).toEqual(`${prefix}Page Not Found`)
})
