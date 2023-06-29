import StyleDictionary, {
    type Config,
    type TransformedToken,
} from 'style-dictionary'

import cssVariableTokensFormatter from './formats/cssVariableTokens'

const darkThemeConfig: Config = {
    source: ['tokens/core/**/*', 'tokens/**/dark.*.ts'],
    platforms: {
        web: {
            transforms: ['attribute/cti', 'name/cti/kebab'],
            buildPath: 'lib/',
            files: [
                {
                    destination: 'variables.dark.css',
                    format: 'css/variables',
                    options: {
                        selector: '[data-theme="dark"]',
                    },
                },
            ],
        },
    },
}

const lightThemeConfig: Config = {
    source: ['tokens/core/**/*', 'tokens/**/light.*.ts'],
    platforms: {
        web: {
            transforms: ['attribute/cti', 'name/cti/kebab'],
            buildPath: 'lib/',
            files: [
                {
                    destination: 'variables.light.css',
                    format: 'css/variables',
                    options: {
                        selector: '[data-theme="light"]',
                    },
                },
            ],
        },
    },
}

const tokenConfig: Config = {
    source: ['tokens/core/**/*', 'tokens/**/light.*.ts'],
    platforms: {
        web: {
            transforms: ['attribute/cti', 'name/cti/camel'],
            buildPath: 'lib/',
            files: [
                {
                    destination: 'index.ts',
                    format: 'javascript/theme-tokens',
                    filter: (token: TransformedToken) => {
                        const category = token.attributes?.category

                        return category !== 'color'
                    },
                },
            ],
        },
    },
}

const darkThemeStyleDictionary = StyleDictionary.extend(darkThemeConfig)
const lightThemeStyleDictionary = StyleDictionary.extend(lightThemeConfig)
const tokensStyleDictionary = StyleDictionary.extend(tokenConfig)

darkThemeStyleDictionary.buildAllPlatforms()
lightThemeStyleDictionary.buildAllPlatforms()
tokensStyleDictionary
    .registerFormat(cssVariableTokensFormatter)
    .buildAllPlatforms()
