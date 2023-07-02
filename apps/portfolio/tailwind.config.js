/** @type {import('tailwindcss').Config} */
export default {
    presets: [require("@developomp-site/tailwind-config/tailwind.config")],
    darkMode: "class",
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
}
