import adapter from "@sveltejs/adapter-static"
import { vitePreprocess } from "@sveltejs/kit/vite"

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: [vitePreprocess()],

    kit: {
        paths: {
            relative: false,
        },
        adapter: adapter({
            pages: "build",
            assets: "build",
            fallback: "index.html",
            precompress: true,
            strict: true,
        }),
    },
}

export default config
