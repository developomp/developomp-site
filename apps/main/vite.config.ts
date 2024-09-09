import { sveltekit } from "@sveltejs/kit/vite"
import path from "path"
import { defineConfig } from "vite"

export default defineConfig({
    plugins: [sveltekit()],
    resolve: {
        alias: {
            $: path.resolve("./src"),
        },
    },
    server: {
        open: true,
        proxy: {
            // https://umami.is/docs/guides/bypass-ad-blockers
            // https://vitejs.dev/config/server-options.html#server-proxy
            // https://developomp.com/stats/* -> https://umami.developomp.com/*
            "^/stats/.*": {
                target: "https://umami.developomp.com/",
                changeOrigin: true,
                rewrite: (path) => path.slice(6), // slice "/stats" off the string (which is 6 characters long)
            },
        },
    },
})
