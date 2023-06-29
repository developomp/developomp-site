import linaria from "@linaria/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import dynamicImport from "vite-plugin-dynamic-import"
import tsconfigPaths from "vite-tsconfig-paths"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), linaria(), dynamicImport(), tsconfigPaths()],
    build: {
        outDir: "dist",
    },
    server: {
        open: true,
        port: 5174,
    },
})
