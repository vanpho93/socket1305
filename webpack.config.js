module.exports = {
    entry: './src/app.js',
    output: {
        filename: './public/bundle.js'
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    }
};
