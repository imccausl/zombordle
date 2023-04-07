module.exports = {
    root: true,
    plugins: ['jest-dom', 'testing-library', 'prettier'],
    extends: [
        'next',
        '@tophat/eslint-config/base',
        '@tophat/eslint-config/web',
    ],
    settings: {
        next: {
            rootDir: 'app/',
        },
    },
    parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json'],
    },
}
