import myPreset from "@pompydev/tailwind-config/tailwind.config.js"

/** @type {import('tailwindcss').Config} */
export default {
    presets: [myPreset],
    content: ["./src/**/*.{html,js,svelte,ts}"],
}
