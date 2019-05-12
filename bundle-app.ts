import './src/assets/scss/style.scss'
import * as Wow from "wow.js";
import * as Rellax from "rellax";
import LazyLoad from "vanilla-lazyload";
import {initIndex} from "./bundle-index";
import smoothScroll from 'smoothscroll-polyfill';
import {Validations} from "./src/constants/Validations";
import {Constants} from "./src/constants/Constants";
import {waitHere} from "./src/splites/Helpers";
import Notification from "notyf";
import "./src/Analytics";
import {GoogleEvent} from "./src/Analytics";

const currentPath = location.pathname.replace('.html', '').replace('/', '').trim().split('/').pop();
const formLoadings = {};
const notification = new Notification();
const headerNavigation = document.querySelector('.header-section .header-navigation-holder > .main-header-list'),
    headerNavigationToggle = document.querySelector('.responsive-menu-toggle'),
    scrollTracks = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
    trackedScrolls = [],
    pageURL = decodeURI(location.pathname);

if (currentPath == '' || currentPath.includes('index'))
    initIndex();

if (document.querySelectorAll('.wow').length)
    new Wow().init();

if (document.querySelectorAll('img').length)
    new LazyLoad();

if (document.querySelectorAll('.parallax').length)
    new Rellax('.parallax');

smoothScroll.polyfill();

document.querySelectorAll('[data-scroll], .smooth-scroll, a[href^="#"]').forEach(element => element.addEventListener('click', event => {
    event.preventDefault();
    const targetElement = document.querySelector(element.getAttribute('href') || element.getAttribute('data-scroll'));
    if (targetElement)
        targetElement.scrollIntoView({
            behavior: 'smooth'
        });
}));


headerNavigationToggle.addEventListener('click', () => {
    const isActive = headerNavigation.classList.contains('show-responsive-menu');
    headerNavigation.classList[isActive ? 'remove' : 'add']('show-responsive-menu');
    headerNavigationToggle.classList[isActive ? 'remove' : 'add']('enable');
});

async function setFormState(formName, formElement, state = 'loading', resetForm = false) {
    const button = formElement.querySelector('button[type="submit"]');

    if (state !== 'done') {
        button.setAttribute('disabled', 'disabled');
        if (!formLoadings[formName])
            formLoadings[formName] = button.innerHTML;
        button.innerHTML = state === 'loading' ? 'صبر کنید' : 'خطا رخ داد';

        if (resetForm)
            formElement.reset();

        await waitHere(3000);
    }

    if (state !== 'loading') {
        button.innerHTML = formLoadings[formName];
        button.removeAttribute('disabled');

        if (resetForm)
            formElement.reset();
    }
}

if (currentPath.includes('contact-us')) {
    Validations.initWithCallback(document.getElementById('contact-form'), async (form) => {
        setFormState('contact-us', form.target, 'loading');
        const formData = new FormData(document.querySelector('form')),

            postData = {
                input_values: {
                    input_1: formData.get('name'),
                    input_2: formData.get('subject'),
                    input_3: formData.get('tel'),
                    input_5: formData.get('email'),
                    input_7: formData.get('email'),
                }
            };

        fetch(Constants.forms.URL(1), {
            method: 'POST',
            mode: 'no-cors',
            credentials: 'include',
            body: JSON.stringify(postData),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            response.json().then(json => {
                setFormState('contact-us', form.target, 'done', true);
                if (json.status === 200 && json.response && json.response.is_valid)
                    notification.confirm('اطلاعات شما به ثبت رسید؛ به‌زودی کارشناسان ما با شما تماس خواهند گرفت.');
                else
                    notification.alert('خطایی رخ‌داده است؛ لطفاً فرم را بازبینی کرده و مجدداً امتحان کنید.');
            }).catch((error) => {
                setFormState('contact-us', form.target, 'error', true);
                notification.alert('خطایی رخ‌داده است؛ لطفاً مجدداً امتحان کنید.')
            });
        }).catch((error) => {
            setFormState('contact-us', form.target, 'error', true);
            notification.alert('خطایی رخ‌داده است؛ لطفاً مجدداً امتحان کنید.')
        });
    });
}

Validations.initWithCallback(document.getElementById('footer-form'), async (form) => {
    setFormState('footer-form', form.target, 'loading');
    const formData = new FormData(document.querySelector('form')),

        postData = {
            input_values: {
                input_2: formData.get('tel'),
            }
        };

    fetch(Constants.forms.URL(2), {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(postData),
        headers: new Headers({
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        })
    }).then(response => {
        response.json().then(json => {
            if (json.status === 200 && json.response && json.response.is_valid)
                notification.confirm('اطلاعات شما به ثبت رسید؛ به‌زودی کارشناسان ما با شما تماس خواهند گرفت.');
            else
                notification.alert('خطایی رخ‌داده است؛ لطفاً فرم را بازبینی کرده و مجدداً امتحان کنید.');
            setFormState('footer-form', form.target, 'done', true);
        }).catch(() => {
            setFormState('footer-form', form.target, 'error', true);
            notification.alert('خطایی رخ‌داده است؛ لطفاً مجدداً امتحان کنید.');
        });
    }).catch(() => {
        setFormState('footer-form', form.target, 'error', true);
        notification.alert('خطایی رخ‌داده است؛ لطفاً مجدداً امتحان کنید.');
    });
});

document.addEventListener('scroll', () => {
    const h = document.documentElement,
        b = document.body,
        st = 'scrollTop',
        sh = 'scrollHeight',
        scrollPercentage = (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100,
        roundedScrollPercentage = Math.ceil(scrollPercentage / 5) * 5;
    if (scrollTracks.indexOf(roundedScrollPercentage) !== -1 && trackedScrolls.indexOf(roundedScrollPercentage) === -1) {
        GoogleEvent(pageURL, roundedScrollPercentage + '%', 'Page Scroll', false);
        trackedScrolls.push(roundedScrollPercentage);
    }
});
