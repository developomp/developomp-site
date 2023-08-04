/** @type {import("eslint").Linter.Config} */
module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended",
        "turbo",
    ],
    ignorePatterns: ["dist/", "build/"],
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint", "import", "simple-import-sort"],
    rules: {
        // import related
        "simple-import-sort/imports": "error",
        "simple-import-sort/exports": "error",
        "import/first": "error",
        "import/newline-after-import": "error",
        "import/no-duplicates": "error",

        // typescript stuff
        "@typescript-eslint/no-non-null-assertion": "off", // https://typescript-eslint.io/rules/no-non-null-assertion
        "@typescript-eslint/consistent-type-imports": "error", // https://typescript-eslint.io/rules/consistent-type-imports
    },
}
