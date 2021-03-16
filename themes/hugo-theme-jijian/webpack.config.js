const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
    entry: {
        main: './src/js/index.ts',
        search: '/src/search/index.ts',
        highlight: ['/src/highlight/index.ts', './src/highlight/index.scss'],
        toc: '/src/toc/index.ts',
        katex: ['./src/katex/index.ts', './src/katex/index.scss'],
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
            {
                test: /\.(ttf|woff2?)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: '../../static/fonts',
                            publicPath: '/fonts'
                        },
                    },
                ],
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', 'jsx'],
    },
    plugins: [
        new ESLintPlugin(),
    ]
};
