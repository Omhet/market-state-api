import { BaseOptions, JSDOM } from 'jsdom';

export const getText = (element: Element | Document, selector: string) => {
    return element.querySelector(selector)?.textContent?.trim();
};

export const getTextArray = (element: Element | Document, selector: string) => {
    return Array.from(element.querySelectorAll(selector)).map((el) =>
        el.textContent?.trim()
    );
};

export const getImage = (element: Element | Document, selector: string) => {
    return element.querySelector(selector)?.getAttribute('src');
};

export const getBackroundImage = (
    element: Element | Document,
    selector: string
) => {
    const styleUrl = element.querySelector<HTMLElement>(selector)?.style
        .backgroundImage;
    return (styleUrl?.match(/url\((.+)\)/) ?? [])[1];
};

export const getLink = (element: Element | Document, selector: string) => {
    return element.querySelector(selector)?.getAttribute('href');
};

export const getDocumentElement = async (
    url: string,
    options?: BaseOptions
) => {
    const {
        window: { document },
    } = await JSDOM.fromURL(url, options);
    return document;
};
