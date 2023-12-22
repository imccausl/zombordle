/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    transpilePackages: ['formula-one', '@zombordle/design-tokens'],
    reactStrictMode: true,
    compiler: {
        styledComponents: true,
    },
    webpack(config) {
        const fileLoaderRule = config.module.rules.find((rule) =>
            rule.test?.test?.('.svg'),
        )

        config.module.rules.push(
            {
                ...fileLoaderRule,
                test: /\.svg$/i,
                resourceQuery: {
                    not: [...fileLoaderRule.resourceQuery.not, /react/],
                },
            },
            {
                test: /\.svg$/i,
                issuer: /\.[jt]sx?$/,
                resourceQuery: /react/,
                use: [
                    {
                        loader: '@svgr/webpack',
                        options: {
                            icon: true,
                            memo: true,
                            svgProps: { role: 'img', 'aria-hidden': 'true' },
                        },
                    },
                ],
            },
        )

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

export default nextConfig
