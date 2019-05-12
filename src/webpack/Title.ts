import {Constants} from "../constants/Constants";

export function Title(...titles) {
    return [
        ...titles,
        Constants.site.title,
    ].map(item => item.toString().trim()).join(' - ');
}