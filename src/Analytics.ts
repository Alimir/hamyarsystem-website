export function GoogleEvent(name, description, category, isInteraction = true) {
    if (typeof window.gtag !== 'undefined')
        window.gtag('event', name, {
            'event_category': category,
            'event_label': description,
        });
    else if (typeof window.ga !== 'undefined')
        window.ga('send', 'event', category, name, description);
    else if (typeof window.dataLayer !== 'undefined')
        window.dataLayer.push({
            'event': isInteraction ? 'GA Event - Interaction' : 'GA Event - Non-Interaction Hit',
            'event_category': category,
            'event_action': name,
            'event_label': description,
        })
}

document.querySelectorAll('.header-section .header-navigation-holder > a, .header-section .header-navigation-holder > .main-header-list > li > a, .header-section .subsidiary-header-list > li > a').forEach(element => {
    element.addEventListener('click', element => {
        const text = getInnerText(element);
        if (text)
            GoogleEvent('Top Navigation Menu', `Click on '${text}'`, 'Navigation');
    });
});

document.querySelectorAll('.header-section .sub-menu > ul > li > a').forEach(element => {
    element.addEventListener('click', element => {
        const text = getInnerText(element);
        if (text)
            GoogleEvent('Top Navigation Sub Menu', `Click on '${text}'`, 'Navigation');
    });
});

document.querySelectorAll('.header-section .header-navigation .top-header-list > li > a').forEach(element => {
    element.addEventListener('click', element => {
        const text = getInnerText(element);
        if (text)
            GoogleEvent('Top Contact Menu', `Click on '${text}'`, 'Contact');
    });
});

document.querySelectorAll('.contact-info').forEach(element => {
    element.addEventListener('click', element => {
        const text = getInnerText(element);
        if (text)
            GoogleEvent('Contact Page', `Click on '${text}'`, 'Contact');
    });
});

document.querySelectorAll('.btn').forEach(element => {
    element.addEventListener('click', element => {
        const text = getInnerText(element);
        if (text)
            GoogleEvent('All Buttons', `Click on '${text}'`, 'Buttons');
    });
});

document.querySelectorAll('.label').forEach(element => {
    element.addEventListener('click', element => {
        const text = getInnerText(element);
        if (text)
            GoogleEvent('All Labels', `Click on '${text}'`, 'Labels');
    });
});

function getInnerText(element) {
    try {
        return element.target && element.target.innerText && element.target.innerText !== '' ? element.target.innerText.toString().trim() : null;
    }
    catch (e) {
        return null;
    }
}