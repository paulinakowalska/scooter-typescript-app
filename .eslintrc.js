module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'prettier/@typescript-eslint',
    ],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module', // Allows for the use of imports
        ecmaFeatures: {
            jsx: true, // Allows for the parsing of JSX
        },
    },
    settings: {
        react: {
            version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
        },
    },
    rules: {
        'react/prop-types': 'off',
        'no-console': ['warn'],
        'prettier/prettier': 'error',
        'no-var-requires': 0,
        '@typescript-eslint/explicit-function-return-type': 'off',
    },
    env: {
        node: true,
        'jest/globals': true,
        browser: true,
    },
    plugins: ['jest', 'prettier', 'react'],
};
