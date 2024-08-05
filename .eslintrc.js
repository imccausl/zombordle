module.exports = {
    root: true,
    extends: ['next', '@imccausl/eslint-config', 'plugin:react/jsx-runtime'],
    settings: {
        next: {
            rootDir: 'app',
        },
    },
    parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json'],
    },
    rules: {
        'react/prop-types': 'off',
    },
}
