import { expect, test } from "@playwright/test"

const prefix = "pomp's blog | "

test("should have proper title", async ({ page }) => {
    await page.goto("/")
    await expect(page).toHaveTitle(`${prefix}Home`)

    await page.goto("/posts/test-post")
    await expect(page).toHaveTitle(`${prefix}Test post`)

    await page.goto("/404")
    await expect(page).toHaveTitle(`${prefix}Page Not Found`)
})
