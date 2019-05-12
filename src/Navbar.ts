export const MainNavbar = [
    {
        title: 'خدمات ما',
        URL: '#',
        menu: [
            {
                title: 'طراحی وب‌سایت',
                URL: 'web-design.html',
                image: require('./assets/images/icons/icon-team.svg'),
                menu: [
                    {
                        title: 'طراحی سایت شخصی'
                    },
                    {
                        title: 'طراحی سایت پزشکی'
                    },
                    {
                        title: 'طراحی سایت شرکتی'
                    },
                    {
                        title: 'طراحی فروشگاه اینترنتی'
                    },
                ]
            }, {
                title: 'سئو و بهینه‌سازی',
                URL: 'seo.html',
                image: require('./assets/images/icons/icon-content.svg'),
                menu: [
                    {
                        title: 'آنالیز وب سایت و استراتژی'
                    },
                    {
                        title: 'تولید محتوای اختصاصی'
                    },
                    {
                        title: 'سئو داخلی'
                    },
                    {
                        title: 'سئو خارجی'
                    },
                ]
            }, {
                title: 'توسعه نرم‌افزار',
                URL: 'software.html',
                image: require('./assets/images/icons/icon-content.svg'),
                menu: [
                    {
                        title: 'توسعه نرم‌افزار تحت وب'
                    },
                    {
                        title: 'توسعه نرم‌افزار موبایل'
                    },
                    {
                        title: 'توسعه نرم‌افزار دسک‌تاپ'
                    },
                    {
                        title: 'توسعه و پشتیبانی فنی'
                    },
                ]
            }, {
                title: 'دیجیتال مارکتینگ',
                URL: 'index.html',
                image: require('./assets/images/icons/icon-team.svg'),
                menu: [
                    {
                        title: 'بهینه سازی تجربه کاربری'
                    },
                    {
                        title: 'تبلیغات در گوگل'
                    },
                    {
                        title: 'تبلیغات بنری'
                    },
                    {
                        title: 'برند سازی'
                    },
                ]
            },

        ]
    },
    {
        title: 'نمونه کارها',
        URL: '#portfolio-section'
    },
    {
        title: 'درباره ما',
        URL: 'about-us.html',
    },
    {
        title: 'تماس با ما',
        URL: 'contact-us.html'
    },
    {
        title: 'وبلاگ',
        URL: 'https://hamyarsystem.com/blog',
        blank: true
    }
];

export const FooterNavbar = [
    [
        {
            title: 'سئو و بهینه سازی',
            URL: '#'
        },
        {
            title: 'تبلیغات پیامکی',
            URL: '#'
        },
        {
            title: 'تبلیغات در گوگل',
            URL: '#'
        },
        {
            title: 'آنالیز و مشاوره سئو',
            URL: '#'
        }
    ],
    [
        {
            title: 'طراحی سایت',
            URL: '#'
        },
        {
            title: 'تولید سازی نرم افزار',
            URL: '#'
        },

        {
            title: 'پشتیبانی فنی',
            URL: '#'
        },
        {
            title: 'تولید محتوا',
            URL: '#'
        },
    ],
];

export const currentPath = () => location.pathname;