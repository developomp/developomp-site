/** @type {import('next').NextConfig} */
const nextConfig = {
    // https://umami.is/docs/guides/bypass-ad-blockers#proxying
    async rewrites() {
        return [
            {
                source: "/stats/:match*",
                destination: "https://analytics.umami.is/:match*",
            },
        ]
    },
    experimental: {
        externalDir: true,
    },
}

module.exports = nextConfig
