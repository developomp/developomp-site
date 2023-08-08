/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    distDir: "build",
    images: { unoptimized: true },
    experimental: {
        externalDir: true,
    },
}

module.exports = nextConfig
