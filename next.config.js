/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    compiler: {
        styledComponents: true,
    },
}

if (process.env.NODE_ENV === 'production' && process.env.CI === 1) {
    nextConfig.assetPrefix = '/zombordle'
}

module.exports = nextConfig
