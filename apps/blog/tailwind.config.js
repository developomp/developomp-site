/** @type {import('tailwindcss').Config} */
module.exports = {
    presets: [require("@developomp-site/tailwind-config/tailwind.config.js")],
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
}
