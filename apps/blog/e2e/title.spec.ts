import { expect, test } from "@playwright/test"

const prefix = "pomp's blog | "

test("should have proper title", async ({ page }) => {
    await page.goto("/")
    expect(await page.title()).toEqual(`${prefix}Home`)

    await page.goto("/posts/test-post")
    expect(await page.title()).toEqual(`${prefix}Test post`)

    await page.goto("/404")
    expect(await page.title()).toEqual(`${prefix}Page Not Found`)
})
