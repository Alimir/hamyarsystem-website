import {removeClassByPrefix, waitHere} from "../Helpers";
import {GoogleEvent} from "../../Analytics";

export function initHeader() {
    let headerSliderStage = 1,
        headerSliderTimeout;

    const headerSliderCarousel = '.header-slider-carousel > ul > li',
        headerSliderCarouselElement = document.querySelectorAll(headerSliderCarousel),
        headerSliderCarouselWrapper = document.getElementById('header-slider-carousel'),
        headerSlides = {}, sliderContent = document.getElementById('header-slider-content');

    document.querySelectorAll('.header-slider-wrapper .slider-content').forEach(element => headerSlides[+element.getAttribute('data-slide')] = element.innerHTML);

    async function setBoardSlide(slideName) {
        const sliderCarousel = document.querySelector(`${headerSliderCarousel}[data-slider="${slideName}"]`);

        headerSliderCarouselElement.forEach(element => element.classList.remove('enable'));

        removeClassByPrefix(headerSliderCarouselWrapper, 'slider-order-');
        headerSliderCarouselWrapper.classList.add(`slider-order-${slideName}`);

        sliderCarousel.classList.add('enable');

        sliderContent.classList.remove('show-slide');
        await waitHere(500);

        sliderContent.classList.remove('hidden-slide');

        sliderContent.innerHTML = headerSlides[slideName];
        await waitHere(500);

        sliderContent.classList.add('show-slide', 'hidden-slide');
    }

    document.querySelectorAll(`${headerSliderCarousel}`).forEach(element => element.addEventListener('click', () => {
        if (!element.classList.contains('enable')) {
            const slider = +element.getAttribute('data-slider');
            headerSliderStage = slider;
            window.clearTimeout(headerSliderTimeout);
            if (typeof slider !== undefined)
                GoogleEvent('Change Slider', slider, 'Slider');
            setBoardSlideLoop(slider, true);
        }
    }));

    function setBoardSlideLoop(stage, firstTime = false) {
        headerSliderTimeout = setTimeout(async () => {
            headerSliderStage = stage >= Object.keys(headerSlides).length ? 1 : stage + 1;
            await setBoardSlide(headerSliderStage);
            setBoardSlideLoop(headerSliderStage);
        }, 8000);
        if (firstTime)
            setBoardSlide(headerSliderStage);
    }

    setBoardSlideLoop(headerSliderStage);
}
