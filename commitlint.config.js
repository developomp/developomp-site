/** @type {import('@commitlint/types').UserConfig} */
module.exports = {
    extends: ["@commitlint/config-conventional"],
    rules: {
        "type-enum": [
            2,
            "always",
            ["chore", "ci", "docs", "feat", "fix", "refactor"],
        ],
        "scope-enum": [
            2,
            "always",
            [
                // apps
                "blog",
                "main",

                // packages
                "content",
                "eslint-config",
                "playwright-config",
                "prettier-config",
                "tailwind-config",
            ],
        ],
    },
}
