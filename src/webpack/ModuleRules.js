"use strict";
exports.__esModule = true;
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var Constants_1 = require("../constants/Constants");
exports.ModuleRules = [
    {
        test: /\.(png|jp(e*)g|ico|gif)$/,
        exclude: /node_modules/,
        use: [
            {
                loader: 'responsive-loader',
                options: {
                    name: Constants_1.Constants.build.assets('images')
                }
            }
        ]
    },
    {
        test: /\.svg$/,
        use: [
            {
                loader: 'svg-sprite-loader',
                options: {
                    extract: true,
                    spriteFilename: function () { return "build/assets/sprites/vectors-[hash:20].svg"; }
                }
            }
        ]
    },
    {
        test: /\.(woff|woff2)$/,
        use: [
            {
                loader: 'url-loader',
                options: {
                    limit: 10,
                    name: Constants_1.Constants.build.assets('fonts')
                }
            },
        ]
    },
    {
        test: /\.(s*)css$/,
        use: [
            {
                loader: MiniCssExtractPlugin.loader
            },
            // {
            //     loader: 'webpack-px-to-rem',
            //     options: {
            //         basePx: 16,
            //         min: 1,
            //     }
            // },
            {
                loader: 'css-loader?url=false'
            },
            {
                loader: 'sass-loader'
            }
        ]
    },
];
exports.ModuleRulesProduct = [
    {
        test: /\.(png|jp(e*)g|ico|gif)$/,
        exclude: /node_modules/,
        use: [
            {
                loader: 'responsive-loader',
                options: {
                    name: Constants_1.Constants.build.assets('images'),
                    quality: 95
                }
            }
        ]
    },
    {
        test: /\.svg$/,
        use: [
            {
                loader: 'svg-sprite-loader',
                options: {
                    extract: true,
                    spriteFilename: function () { return "build/assets/sprites/vectors-[hash:20].svg"; }
                }
            }
        ]
    },
    {
        test: /\.(woff|woff2)$/,
        use: [
            {
                loader: 'url-loader',
                options: {
                    limit: 10,
                    name: Constants_1.Constants.build.assets('fonts')
                }
            },
        ]
    },
    {
        test: /\.(s*)css$/,
        use: [
            {
                loader: MiniCssExtractPlugin.loader
            },
            {
                loader: 'webpack-px-to-rem',
                options: {
                    basePx: 16,
                    min: 1
                }
            },
            {
                loader: 'css-loader?url=false'
            },
            {
                loader: 'sass-loader'
            }
        ]
    },
    {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
            loader: "babel-loader",
            options: {
                presets: ["@babel/preset-env"] //Preset used for env setup
            }
        }
    }
];
