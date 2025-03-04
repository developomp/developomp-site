const sharedConfig = require("@pompydev/prettier-config")

/** @type {import("prettier").Options} */
module.exports = {
    ...sharedConfig,
    plugins: ["prettier-plugin-svelte", "prettier-plugin-tailwindcss"],
    overrides: [
        ...sharedConfig.overrides,
        { files: "*.svelte", options: { parser: "svelte" } },
    ],
}
