import defaultEslintConfig from '@imccausl/dev/eslint-config'

export default [
    {
        ignores: [
            '**/lib/**/*',
            '**/.vitest/**/*',
            '.turbo',
            'app/.turbo',
            'app/out',
            'app/.next',
            'out',
        ],
    },
    ...defaultEslintConfig,
    {
        settings: {
            next: {
                rootDir: 'app',
            },
        },
        rules: {
            'react/prop-types': 'off',
            'import-x/no-named-as-default': 'off',
            'no-console': 'error',

        },
    },
]
