const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
    entry: {},
    mode: 'production',
    output: {
        path: path.resolve(path.join(__dirname, 'assets', 'js')),
        filename: '[name].js'
    },
    module: {
        rules: [
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
// TODO 自己弄个github cdn放js 自己本地打包后再放github 可以实现吗？
