
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const constants = require('./webpack.constants');

exports.babelLoader = () => ({
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
        ],
    },
});

exports.babelIstambulLoader = () => ({
    module: {
        rules: [
            {
                test: /\.js?$/,
                include: /src/,
                exclude: /(node_modules|__tests__|tests_index.js)/,
                use: [{
                    loader: 'istanbul-instrumenter-loader',
                    options: {
                        esModules: true
                    }
                }],
            }
        ]
    }
});

exports.bundleTreeChart = (analyzerPort = 8888) => ({
    plugins: [
        new BundleAnalyzerPlugin({
            analyzerPort,
        }),
    ],
});

exports.sassLoader = () => ({
    module: {
        rules: [
            {
                test:/\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
                exclude: /node_modules/,
            }
        ]
    }
});

exports.noParseD3Vendor = () => ({
    module: {
        noParse: [
            new RegExp(constants.PATHS.vendor + '/d3/d3.js')
        ]
    }
});

exports.externals = () => ({
    externals: {
        d3: 'd3'
    },
});

exports.aliasD3ToVendorPath = () => ({
    resolve: {
        alias: {
            d3: constants.PATHS.vendor + '/d3',
        }
    }
});

// Deprecated: devServer is now configured directly in webpack.config.js
// Keeping this for backwards compatibility but it's not used anymore
exports.devServer = (port) => ({
    devServer: {
        host: '0.0.0.0',
        port,
    }
});
