/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    compiler: {
        styledComponents: true,
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ['@svgr/webpack'],
        })

        return config
    },
}

/**
 * I think this is only needed for hosting on github pages
 * without a custom domain, because the site is hosted at
 * imccausl.github.io/zombordle
 */

if (process.env.CI === '1') {
    nextConfig.assetPrefix = '/zombordle'
}

module.exports = nextConfig
