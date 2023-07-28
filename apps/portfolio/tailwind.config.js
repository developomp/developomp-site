/** @type {import('tailwindcss').Config} */
module.exports = {
    presets: [require("@developomp-site/tailwind-config/tailwind.config.js")],
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
}
