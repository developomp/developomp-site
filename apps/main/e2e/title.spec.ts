import { expect, test } from "@playwright/test"

const prefix = "developomp | "

test("should have proper title", async ({ page }) => {
    await page.goto("/")
    expect(await page.title()).toEqual("developomp")

    await page.goto("/404")
    await page.waitForTimeout(1000)
    expect(await page.title()).toEqual(`${prefix}Page Not Found`)
})
