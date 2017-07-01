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
/*
    Link github
    link heroku
    1 ban mo ta cac tinh nang -> Noi bat
    khoaphamtraining@gmail.com
    -> Ho ten, ngay sinh, NodeJS 13/05/2017
    Ten de tai.
*/
