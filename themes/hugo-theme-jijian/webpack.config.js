const path = require('path');

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
};
