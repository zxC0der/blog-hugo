const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
    entry: {
        main: './src/js/index.ts',
        search: '/src/search/index.ts',
        toc: '/src/toc/index.ts',
    },
    mode: 'production',
    output: {
        path: path.resolve(path.join(__dirname, 'assets', 'js')),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: ['babel-loader', 'ts-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.(scss)$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', 'jsx'],
    },
    plugins: [
        new ESLintPlugin(),
    ]
};
