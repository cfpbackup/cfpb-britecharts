
module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        jasmine: true,
        amd: true,
        node: true,
    },
    parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
    },
    globals: {
        sinon: 'readonly',
        d3: 'readonly',
    },
    extends: [
        'eslint:recommended',
    ],
    rules: {
        'block-scoped-var': 1,
        'comma-style': [2, 'last'],
        'complexity': 1,
        'consistent-this': [0, 'self'],
        'default-case': 1,
        'dot-notation': 0,
        'guard-for-in': 1,
        'keyword-spacing': 1,
        'newline-after-var': 1,
        'no-alert': 2,
        'no-console': 1,
        'no-debugger': 1,
        'no-div-regex': 1,
        'no-eq-null': 1,
        'no-floating-decimal': 1,
        'no-multiple-empty-lines': [2, {'max': 2}],
        'no-nested-ternary': 1,
        'no-param-reassign': 0,
        'no-self-compare': 1,
        'no-throw-literal': 1,
        'no-void': 1,
        'no-unused-vars': [1, {
            'varsIgnorePattern': 'd3Transition|^_',
            'argsIgnorePattern': '^_',
        }],
        'no-underscore-dangle': 0,
        'quotes': [2, 'single', { 'avoidEscape': true }],
        'one-var': [1, {
            'var': 'always',
            'const': 'never',
        }],
        'radix': 1,
        'vars-on-top': 1,
        'wrap-iife': [2, 'inside'],
    },
    ignorePatterns: [
        'node_modules/',
        'dist/',
        'docs/',
        'demos/build/',
        'sandbox/build/',
        'coverage/',
        '*.min.js',
    ],
    overrides: [
        {
            files: ['test/**/*.js', '**/*.spec.js'],
            env: {
                jasmine: true,
            },
            globals: {
                expect: 'readonly',
                jasmine: 'readonly',
                spyOn: 'readonly',
            },
        },
        {
            files: [
                'webpack.*.js',
                'karma.conf.js',
                'jsdoc.config.js',
                'postcss.config.js',
                '.eslintrc.js',
                'scripts/**/*.js',
            ],
            env: {
                node: true,
            },
            rules: {
                'no-console': 0,
            },
        },
    ],
};
