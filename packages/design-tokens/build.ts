import StyleDictionary, { type Config } from 'style-dictionary'

const darkThemeConfig: Config = {
    source: ['tokens/core/**/*', 'tokens/**/dark.*.ts'],
    platforms: {
        web: {
            transforms: ['attribute/cti', 'name/cti/camel'],
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
            transforms: ['attribute/cti', 'name/cti/camel'],
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

const darkThemeStyleDictionary = StyleDictionary.extend(darkThemeConfig)
const lightThemeStyleDictionary = StyleDictionary.extend(lightThemeConfig)

darkThemeStyleDictionary.buildAllPlatforms()
lightThemeStyleDictionary.buildAllPlatforms()
