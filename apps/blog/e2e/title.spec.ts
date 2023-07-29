import { expect, test } from "@playwright/test"

test("should have proper title", async ({ page }) => {
    await page.goto("/")
    expect(await page.title()).toEqual("pomp's blog | Home")

    await page.goto("/posts/test-post")
    expect(await page.title()).toEqual("pomp's blog | Test post")
})
