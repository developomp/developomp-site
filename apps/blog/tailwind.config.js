import myPreset from "@developomp-site/tailwind-config/tailwind.config.js"

/** @type {import('tailwindcss').Config} */
export default {
    presets: [myPreset],
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
}
