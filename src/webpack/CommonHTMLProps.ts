import {HtmlWebpackPluginOptions} from "../../types.webpack";
import {Constants} from "../constants/Constants";

export const CommonHTMLProps: HtmlWebpackPluginOptions = {
    // favicon: 'src/assets/images/favicon.ico',
    hash: false,
    minify: true,
    meta: {
        charset: 'UTF-8',
        viewport: 'width=device-width, initial-scale=1',
    },
};

export const CommonHTMLPropsProduction: HtmlWebpackPluginOptions = {
    ...CommonHTMLProps,
    // favicon: './src/assets/images/favicon.ico',
    minify: {
        html5: true,
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
        minifyURLs: false,
        removeComments: true,
        removeEmptyAttributes: true,
    }
};


export const CommonIconProps = {
    logo: './src/assets/images/logo/colorful-logo.png',
    prefix: Constants.build.assets('icons/[hash]', false, null, true),
    title: 'همیار سیستم',
    icons: {
        android: true,
        appleIcon: true,
        appleStartup: true,
        coast: true,
        favicons: true,
        firefox: true,
        opengraph: true,
        twitter: true,
        yandex: true,
        windows: true
    }
};
