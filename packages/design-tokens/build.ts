import StyleDictionary, { type Config } from 'style-dictionary'

const config: Config = {
    source: ['tokens/**/*.ts'],
    platforms: {
        web: {
            transforms: ['attribute/cti', 'name/cti/camel'],
            buildPath: 'lib',
        },
    },
}

const configuredStyleDictionary = StyleDictionary.extend(config)

configuredStyleDictionary.buildAllPlatforms()
