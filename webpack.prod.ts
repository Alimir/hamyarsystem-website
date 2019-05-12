import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';
import SiteMapPlugin from 'sitemap-webpack-plugin';
import * as FaviconWebpackPlugin from "favicons-webpack-plugin";
import {CommonHTMLPropsProduction, CommonIconProps} from "./src/webpack/CommonHTMLProps";
import {ModuleRulesProduct} from "./src/webpack/ModuleRules";
import {Constants} from "./src/constants/Constants";
import {Contents} from "./src/Contents";
import {Title} from "./src/webpack/Title";
import {HtmlWebpackPluginOptions} from "./types.webpack";
import {SiteMapProps} from "./src/webpack/SiteMapProps";
import * as SpriteSVGPlugin from 'svg-sprite-loader/plugin';
import ImageminPlugin from 'imagemin-webpack-plugin';
import * as OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import * as imageminMozjpeg from 'imagemin-mozjpeg';
import * as ImageminSVGO from 'imagemin-svgo';
// import * as MinifyPlugin from 'babel-minify-webpack-plugin';

const config = (env, argv) => {
    return {
        mode: 'production',
        entry: './bundle-app.ts',
        output: {
            chunkFilename: Constants.build.assets('bundle', true, 'js'),
            filename: Constants.build.assets('bundle', true, 'js'),
        },
        resolve: {
            extensions: ['.ts', '.js', '.json']
        },
        module: {
            rules: ModuleRulesProduct,
        },
        plugins: [
            ...Contents.map(item => {
                const {title, rawTitle, description, meta, template, ...props} = item;
                return new HtmlWebpackPlugin(<HtmlWebpackPluginOptions> {
                    ...props,
                    ...CommonHTMLPropsProduction,
                    meta: {
                        ...CommonHTMLPropsProduction.meta,
                        ...meta,
                        description,
                    },
                    title: rawTitle ? rawTitle : Title(title),
                    template: `./src/templates/${template}`,
                })
            }),
            new MiniCssExtractPlugin({
                filename: './main-[chunkhash].css'
            }),
            new ImageminPlugin({
                test: /\.(jpg|jpeg|png|gif|svg)$/i,
                plugins: [
                    imageminMozjpeg({
                        quality: 85,
                        progressive: true
                    }),
                    ImageminSVGO()
                ]
            }),
            new FaviconWebpackPlugin(CommonIconProps),
            new SiteMapPlugin(Constants.site.URL, Contents.map(item => item.filename), SiteMapProps),
            new SpriteSVGPlugin(),
            // new MinifyPlugin()
        ],
        optimization: {
            minimizer: [
                new OptimizeCSSAssetsPlugin(),
            ]
        },
        watch: true,
    }
};
export default config;
