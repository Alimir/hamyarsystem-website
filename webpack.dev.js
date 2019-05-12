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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
exports.__esModule = true;
var HtmlWebpackPlugin = require("html-webpack-plugin");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var sitemap_webpack_plugin_1 = require("sitemap-webpack-plugin");
var FaviconWebpackPlugin = require("favicons-webpack-plugin");
var CommonHTMLProps_1 = require("./src/webpack/CommonHTMLProps");
var ModuleRules_1 = require("./src/webpack/ModuleRules");
var Constants_1 = require("./src/constants/Constants");
var Contents_1 = require("./src/Contents");
var Title_1 = require("./src/webpack/Title");
var SiteMapProps_1 = require("./src/webpack/SiteMapProps");
var SpriteSVGPlugin = require("svg-sprite-loader/plugin");
var MinifyPlugin = require("babel-minify-webpack-plugin");
var config = function (env, argv) {
    var isProduction = argv.mode === 'production';
    return {
        mode: isProduction ? 'production' : 'development',
        entry: './bundle-app.ts',
        output: {
            path: '/',
            chunkFilename: Constants_1.Constants.build.assets('bundle', true, 'js'),
            filename: Constants_1.Constants.build.assets('bundle', true, 'js')
        },
        resolve: {
            extensions: ['.ts', '.js', '.json']
        },
        module: {
            rules: ModuleRules_1.ModuleRules
        },
        plugins: Contents_1.Contents.map(function (item) {
            var title = item.title, rawTitle = item.rawTitle, description = item.description, meta = item.meta, template = item.template, props = __rest(item, ["title", "rawTitle", "description", "meta", "template"]);
            return new HtmlWebpackPlugin(__assign({}, props, CommonHTMLProps_1.CommonHTMLProps, { meta: __assign({}, CommonHTMLProps_1.CommonHTMLProps.meta, meta, { description: description }), title: rawTitle ? rawTitle : Title_1.Title(title), template: "src/templates/" + template }));
        }).concat([
            new MiniCssExtractPlugin({
                filename: '/main-[chunkhash].css'
            }),
            new FaviconWebpackPlugin(CommonHTMLProps_1.CommonIconProps),
            new sitemap_webpack_plugin_1["default"](Constants_1.Constants.site.URL, Contents_1.Contents.map(function (item) { return item.filename; }), SiteMapProps_1.SiteMapProps),
            new SpriteSVGPlugin(),
            new MinifyPlugin()
        ]),
        watch: true
    };
};
exports["default"] = config;
