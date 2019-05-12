"use strict";
exports.__esModule = true;
exports.Constants = {
    site: {
        URL: 'https://hamyarsystem.com',
        title: 'همیار سیستم',
        company: {
            address: 'تهران؛ خیابان شریعتی، ابتدای خیابان قبا، پلاک 6 (ساختمان قبا)، طبقه سوم، واحد 9',
            phone: '02122877743',
            email: 'info@hamyarsystem.com',
            map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3237.7162351445486!2d51.4477419!3d35.7577788!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e040df417a44d%3A0xfd85f0441c086ac6!2z2YfZhduM2KfYsdiz24zYs9iq2YU!5e0!3m2!1sen!2s!4v1544513258521'
        }
    },
    blog: {
        API: 'https://hamyarsystem.com/blog/wp-json/wp/v2/posts/',
        categories: {
            110: {
                title: 'اخبار',
                link: 'https://hamyarsystem.com/blog/category/%d8%a7%d8%ae%d8%a8%d8%a7%d8%b1'
            },
            137: {
                title: 'بازاریابی اینترنتی',
                link: 'https://hamyarsystem.com/blog/category/%d8%a8%d8%a7%d8%b2%d8%a7%d8%b1%db%8c%d8%a7%d8%a8%db%8c-%d8%a7%db%8c%d9%86%d8%aa%d8%b1%d9%86%d8%aa%db%8c-2'
            },
            136: {
                title: 'سئو',
                link: 'https://hamyarsystem.com/blog/category/%d8%b3%d8%a6%d9%88-seo'
            },
            1: {
                title: 'مقالات',
                link: 'https://hamyarsystem.com/blog/category/article'
            },
            87: {
                title: 'نرم‌افزار پزشکی',
                link: 'https://hamyarsystem.com/blog/category/%d9%86%d8%b1%d9%85-%d8%a7%d9%81%d8%b2%d8%a7%d8%b1-%d9%be%d8%b2%d8%b4%da%a9%db%8c'
            }
        }
    },
    build: {
        assets: function (type, hash, extension, onlyPath) {
            if (hash === void 0) { hash = true; }
            if (extension === void 0) { extension = '[ext]'; }
            if (onlyPath === void 0) { onlyPath = false; }
            return "build/assets/" + type + "/" + (onlyPath ? '' : "[name]" + (hash ? '-[hash]' : '') + "." + extension);
        },
        URL: function (path) {
            if (path === void 0) { path = undefined; }
            return "https://hamyarsystem.com" + (path ? "/" + path : '');
        }
    },
    forms: {
        URL: function (formID) { return "https://hamyarsystem.com/blog/gravityformsapi/forms/" + formID + "/submissions"; }
    }
};
