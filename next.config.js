require('dotenv').config();
const withSass = require('@zeit/next-sass');
const withCSS = require("@zeit/next-css");
const withImages = require('next-images');

module.exports = withImages(withCSS(withSass({
    cssLoaderOptions: {
        url: false
    },
    env: {
        doesthis: 'work?'
    },
    webpack(config, options) {
        config.module.rules.push({
            test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 100000
                }
            }
        });

        config.module.rules.push({
            test: /\.json$/,
            use: {
                loader: 'json-loader',
                options: {
                    limit: 100000
                }
            }
        })

        if(!options.isServer) {
            config.node = {
                fs: 'empty'
            }
        }

        return config;
    }
})));
