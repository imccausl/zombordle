/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['formula-one', '@zombordle/design-tokens'],
    reactStrictMode: true,
    compiler: {
        styledComponents: true,
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: [
                {
                    loader: '@svgr/webpack',
                    options: {
                        exportType: 'named',
                    },
                },
            ],
        })

        return config
    },
}

/**
 * I think this is only needed for hosting on github pages
 * without a custom domain, because the site is hosted at
 * imccausl.github.io/zombordle. Using custom domain, so
 * will remove. Commenting out to remind me if/when the domain expires?
 */

// if (process.env.CI === '1') {
//     nextConfig.assetPrefix = '/zombordle'
// }

module.exports = nextConfig
