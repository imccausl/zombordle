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
            rootDir: 'app/src',
        },
    },
    parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json'],
    },
    rules: {
        '@next/next/no-html-link-for-pages': ['error', 'app/src/pages/'],
    },
}
