module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        "plugin:react-hooks/recommended",
        "@developomp-site/eslint-config",
    ],
    parserOptions: { ecmaVersion: "latest", sourceType: "module" },
    plugins: ["react-refresh"],
    rules: {
        "react-refresh/only-export-components": "warn",
        "react-hooks/exhaustive-deps": "off",
    },
}
