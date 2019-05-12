import * as HtmlWebpackPlugin from 'html-webpack-plugin';
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin';
import SiteMapPlugin from 'sitemap-webpack-plugin';
import * as FaviconWebpackPlugin from "favicons-webpack-plugin";
import {CommonHTMLProps, CommonIconProps} from "./src/webpack/CommonHTMLProps";
import {ModuleRules} from "./src/webpack/ModuleRules";
import {Constants} from "./src/constants/Constants";
import {Contents} from "./src/Contents";
import {Title} from "./src/webpack/Title";
import {HtmlWebpackPluginOptions} from "./types.webpack";
import {SiteMapProps} from "./src/webpack/SiteMapProps";
import * as SpriteSVGPlugin from 'svg-sprite-loader/plugin';
import * as MinifyPlugin from 'babel-minify-webpack-plugin';

const config = (env, argv) => {
    const isProduction = argv.mode === 'production';
    return {
        mode: isProduction ? 'production' : 'development',
        entry: './bundle-app.ts',
        output: {
            path: '/',
            chunkFilename: Constants.build.assets('bundle', true, 'js'),
            filename: Constants.build.assets('bundle', true, 'js'),
        },
        resolve: {
            extensions: ['.ts', '.js', '.json']
        },
        module: {
            rules: ModuleRules,
        },
        plugins: [
            ...Contents.map(item => {
                const {title, rawTitle, description, meta, template, ...props} = item;
                return new HtmlWebpackPlugin(<HtmlWebpackPluginOptions> {
                    ...props,
                    ...CommonHTMLProps,
                    meta: {
                        ...CommonHTMLProps.meta,
                        ...meta,
                        description,
                    },
                    title: rawTitle ? rawTitle : Title(title),
                    template: `src/templates/${template}`,
                })
            }),
            new MiniCssExtractPlugin({
                filename: '/main-[chunkhash].css'
            }),
            new FaviconWebpackPlugin(CommonIconProps),
            new SiteMapPlugin(Constants.site.URL, Contents.map(item => item.filename), SiteMapProps),
            new SpriteSVGPlugin(),
            new MinifyPlugin()
        ],
        watch: true,
    }
};
export default config;
