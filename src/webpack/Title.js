"use strict";
exports.__esModule = true;
var Constants_1 = require("../constants/Constants");
function Title() {
    var titles = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        titles[_i] = arguments[_i];
    }
    return titles.concat([
        Constants_1.Constants.site.title,
    ]).map(function (item) { return item.toString().trim(); }).join(' - ');
}
exports.Title = Title;
