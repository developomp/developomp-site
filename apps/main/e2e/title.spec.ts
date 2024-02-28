import { expect, test } from "@playwright/test"

const prefix = "developomp | "

test("should have proper title", async ({ page }) => {
    await page.goto("/")
    await expect(page).toHaveTitle("developomp")

    await page.goto("/404")
    await expect(page).toHaveTitle(`${prefix}Page Not Found`)
})
