/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    distDir: "dist",
    images: { unoptimized: true },
    experimental: {
        externalDir: true,
    },
}

module.exports = nextConfig
