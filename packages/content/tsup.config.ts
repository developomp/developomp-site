import { defineConfig } from "tsup"

export default defineConfig({
    // clean: true, // this only removes file, not folders. Using rm -rf instead
    target: "node20",
    outDir: "build",
    format: ["esm"],
    entry: ["src/index.ts"],
})
