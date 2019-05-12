"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var Constants_1 = require("../constants/Constants");
exports.CommonHTMLProps = {
    // favicon: 'src/assets/images/favicon.ico',
    hash: false,
    minify: true,
    meta: {
        charset: 'UTF-8',
        viewport: 'width=device-width, initial-scale=1'
    }
};
exports.CommonHTMLPropsProduction = __assign({}, exports.CommonHTMLProps, { 
    // favicon: './src/assets/images/favicon.ico',
    minify: {
        html5: true,
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
        minifyURLs: false,
        removeComments: true,
        removeEmptyAttributes: true
    } });
exports.CommonIconProps = {
    logo: './src/assets/images/logo/colorful-logo.png',
    prefix: Constants_1.Constants.build.assets('icons/[hash]', false, null, true),
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
