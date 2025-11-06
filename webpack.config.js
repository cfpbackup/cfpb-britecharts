
const path = require('path');
const { merge } = require('webpack-merge');

const parts = require('./webpack.parts');
const constants = require('./webpack.constants');

const demosConfig = merge([
    {
        mode: 'development',
        devtool: 'eval-cheap-source-map',
        entry: constants.DEMOS,
        output: {
            path: path.resolve(__dirname, './demos/build/'),
            publicPath: '/assets/',
            filename: '[name].js'
        },
        externals: {
            britecharts: 'britecharts'
        },
        devServer: {
            static: [
                {
                    directory: path.resolve(__dirname, './docs'),
                    publicPath: '/',
                },
                {
                    directory: path.resolve(__dirname, './docs'),
                    publicPath: '/britecharts',
                }
            ],
            port: 8001,
            hot: true,
            host: '0.0.0.0',
            allowedHosts: 'all',
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        },
        optimization: {
            minimize: false,
        },
    },
    parts.babelLoader(),
]);

const testConfig = merge([
    {
        mode: 'development',
        resolve: {
            modules: [
                path.resolve(__dirname, './src/charts'),
                path.resolve(__dirname, './test/fixtures'),
                'node_modules',
            ],
        }
    },
    parts.babelLoader(),
    parts.aliasD3ToVendorPath(),
    parts.babelIstambulLoader(),
]);

const sandboxConfig = merge([
    {
        mode: 'development',
        devtool: 'eval-cheap-source-map',
        entry: {
            sandbox: path.resolve(__dirname, './sandbox/sandbox.js'),
        },
        output: {
            path: path.resolve(__dirname, './sandbox/build'),
            publicPath: '/assets/',
            filename: '[name].js',
        },
        devServer: {
            static: {
                directory: path.resolve(__dirname, './sandbox'),
            },
            port: 8002,
            hot: true,
            host: '0.0.0.0',
            allowedHosts: 'all',
        },
    },
    parts.babelLoader(),
    parts.sassLoader(),
]);

const prodBundleConfig = merge([
    {
        mode: 'production',
        devtool: 'source-map',
        entry: {
            britecharts: constants.PATHS.bundleIndex
        },
        output: {
            path: path.resolve(__dirname, 'dist/bundled'),
            filename: 'britecharts.min.js',
            library: {
                name: 'britecharts',
                type: 'umd'
            }
        },
    },
    parts.babelLoader(),
    parts.aliasD3ToVendorPath(),
    // parts.bundleTreeChart(9999),
    parts.noParseD3Vendor(),
    parts.externals(),
]);

const prodChartsConfig = merge([
    {
        mode: 'production',
        devtool: 'source-map',
        entry: constants.CHARTS,
        output: {
            path: path.resolve(__dirname, './dist/umd'),
            filename: '[name].min.js',
            library: {
                name: ['britecharts', '[name]'],
                type: 'umd'
            }
        },
    },
    parts.babelLoader(),
    parts.aliasD3ToVendorPath(),
    // parts.bundleTreeChart(),
    parts.noParseD3Vendor(),
    parts.externals(),
]);

module.exports = (env) => {
    // eslint-disable-next-line no-console
    console.log('%%%%%%%% env', env);

    if (env.demos || env === 'demos') {
        return demosConfig;
    }

    if (env.test || env === 'test') {
        return testConfig;
    }

    if (env.sandbox || env === 'sandbox') {
        return sandboxConfig;
    }

    if (env.production || env === 'production') {
        return [
            prodBundleConfig,
            prodChartsConfig
        ];
    }
};
