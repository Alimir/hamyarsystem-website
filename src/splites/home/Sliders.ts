import {tns} from "tiny-slider/src/tiny-slider"
import {removeClassByPrefix} from "../Helpers";
import {GoogleEvent} from "../../Analytics";

export function initSliders() {
    const portfolioSlider = tns({
            container: '.portfolio-slider',
            items: 2,
            mouseDrag: true,
            slideBy: "page",
            swipeAngle: false,
            speed: 400,
            controls: false,
            nav: false,
            lazyload: true,
            autoHeight: true,
            responsive: {
                769: {
                    items: 5
                },
                500: {
                    items: 3
                }
            },
        }),
        customersCommentsSlider = tns({
            container: ".customers-comments-slider",
            items: 1,
            axis: "vertical",
            swipeAngle: false,
            speed: 400,
            controls: false,
            nav: false,
            lazyload: true,
            autoHeight: true,
        }),
        nextCommentButton = document.getElementById('customers-comments-next-button');
    formatPortfolioSlides();


    if (portfolioSlider && portfolioSlider.events)
        portfolioSlider.events.on('indexChanged', () => formatPortfolioSlides());

    if (nextCommentButton)
        nextCommentButton.onclick = () => customersCommentsSlider.goTo('next');

    function formatPortfolioSlides() {
        document.querySelectorAll('.portfolio-list .portfolio-slider > .portfolio-demo').forEach(element => removeClassByPrefix(element, 'slider-order-'));
        document.querySelectorAll('.portfolio-list .portfolio-slider > .portfolio-demo.tns-slide-active').forEach((element, index) => element.classList.add(`slider-order-${index + 1}`));
    }

    customersCommentsSlider.events.on('indexChanged', info => {
        GoogleEvent('Slider', `Changed to tab ${info.index}`, 'Customers Comments')
    });

    portfolioSlider.events.on('indexChanged', info => {
        GoogleEvent('Slider', `Changed to tab ${info.index}`, 'Portfolio')
    });
}
