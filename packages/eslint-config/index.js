module.exports = {
	extends: [
		"plugin:@typescript-eslint/recommended",
		"plugin:json/recommended",
		"eslint:recommended",
		"prettier",
		"turbo",
	],
	parser: "@typescript-eslint/parser",
	plugins: ["@typescript-eslint"],
	rules: {
		"@next/next/no-html-link-for-pages": "off",

		"@typescript-eslint/explicit-module-boundary-types": "off",
		"@typescript-eslint/no-empty-interface": "off",
	},
}
