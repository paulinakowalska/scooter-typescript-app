module.exports = api => {
    api.cache(true);

    return {
        presets: [
            [
                '@babel/env',
                {
                    useBuiltIns: 'usage',
                    corejs: 3,
                    targets: {
                        browsers: 'Last 2 Chrome versions, Firefox ESR',
                        node: 'current',
                    },
                },
            ],
            [
                '@babel/preset-react',
                {
                    development: process.env.BABEL_ENV !== 'build',
                },
            ],
            '@babel/preset-typescript',
        ],
        env: {
            build: {
                ignore: ['**/*.test.tsx', '**/*.test.ts', '__snapshots__'],
            },
        },
        ignore: ['node_modules'],
        plugins: ['babel-plugin-styled-components'],
    };
};
