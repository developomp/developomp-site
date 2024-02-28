import { expect, test } from "@playwright/test"

const prefix = "pomp's portfolio | "

test("should have proper title", async ({ page }) => {
    await page.goto("/")
    await expect(page).toHaveTitle(`${prefix}Home`)

    await page.goto("/project/developomp-site")
    await expect(page).toHaveTitle(`${prefix}developomp-site`)

    await page.goto("/404")
    await expect(page).toHaveTitle(`${prefix}Page Not Found`)
})
