import { defineConfig } from "@playwright/test"

const SECOND = 1000
const baseURL = "http://localhost:3000"

// https://playwright.dev/docs/test-configuration
export default defineConfig({
    // Artifacts folder where screenshots, videos, and traces are stored.
    outputDir: "test-results/",

    // https://playwright.dev/docs/test-advanced#launching-a-development-web-server-during-the-tests
    webServer: {
        command: "pnpm dev:headless",
        url: baseURL,
        timeout: 10 * SECOND,
    },

    use: {
        // Use baseURL so to make navigation relative.
        // https://playwright.dev/docs/api/class-testoptions#test-options-base-url
        baseURL,
    },
})
