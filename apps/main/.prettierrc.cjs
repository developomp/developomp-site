const sharedConfig = require("@developomp-site/prettier-config")

module.exports = {
    ...sharedConfig,
    plugins: ["prettier-plugin-svelte", "prettier-plugin-tailwindcss"],
    overrides: [
        ...sharedConfig.overrides,
        { files: "*.svelte", options: { parser: "svelte" } },
    ],
}
