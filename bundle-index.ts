import {initBlog} from './src/splites/home/Blog';
import {initSliders} from './src/splites/home/Sliders';
import {initHeader} from './src/splites/home/HeaderBoard';

let inBlogLoaded = false;

export function initIndex() {
    initSliders();
    initHeader();
    document.addEventListener('scroll', () => {
        startBlogTracking();
    });
    startBlogTracking();

}

function startBlogTracking() {
    if (inBlogLoaded === false) {
        const currentScrollLocation = document.documentElement.scrollTop,
            totalScroll = document.body.scrollHeight;
        if ((totalScroll / 2.5) <= currentScrollLocation) {
            initBlog();
            inBlogLoaded = true;
        }
    }
}