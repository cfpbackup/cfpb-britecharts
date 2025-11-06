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
