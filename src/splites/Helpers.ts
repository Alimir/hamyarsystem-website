export function removeClassByPrefix(element, prefix) {
    element.className = element.className.replace(new RegExp('\\b' + prefix + '(.*)?\\b', 'g'), '');
    return element;
}

export function waitHere(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
