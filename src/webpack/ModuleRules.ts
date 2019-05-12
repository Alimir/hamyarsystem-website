import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';
import {Constants} from "../constants/Constants";

export const ModuleRules = [
    {
        test: /\.(png|jp(e*)g|ico|gif)$/,
        exclude: /node_modules/,
        use: [
            {
                loader: 'responsive-loader',
                options: {
                    name: Constants.build.assets('images'),
                    // quality: 95,
                    // placeholder: true
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
                    spriteFilename: () => `build/assets/sprites/vectors-[hash:20].svg`
                },
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
                    name: Constants.build.assets('fonts')
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
        ],
    },
];

export const ModuleRulesProduct = [
    {
        test: /\.(png|jp(e*)g|ico|gif)$/,
        exclude: /node_modules/,
        use: [
            {
                loader: 'responsive-loader',
                options: {
                    name: Constants.build.assets('images'),
                    quality: 95,
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
                    spriteFilename: () => `build/assets/sprites/vectors-[hash:20].svg`
                },
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
                    name: Constants.build.assets('fonts')
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
                    min: 1,
                }
            },
            {
                loader: 'css-loader?url=false'
            },
            {
                loader: 'sass-loader'
            }
        ],
    },
    {
        test: /\.js$/, //Regular expression
        exclude: /(node_modules|bower_components)/,//excluded node_modules
        use: {
            loader: "babel-loader",
            options: {
                presets: ["@babel/preset-env"]  //Preset used for env setup
            }
        }
    }
];