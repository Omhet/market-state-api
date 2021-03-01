export const getText = (element: Element | Document, selector: string) => {
    return element.querySelector(selector)?.textContent?.trim();
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
