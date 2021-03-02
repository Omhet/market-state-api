import { JSDOM } from 'jsdom';
import { getBackroundImage } from './utils';

const parserOptions = {
    referrer: 'https://example.com/',
};

const FearAndGreedIndexUrl = 'https://money.cnn.com/data/fear-and-greed';
const VixUrl = 'https://www.cnbc.com/quotes/.VIX';

export const getFearAndGreedIndex = async () => {
    const dom = await JSDOM.fromURL(`${FearAndGreedIndexUrl}`, parserOptions);
    const { document } = dom.window;
    return getBackroundImage(document, '#needleChart');
};

export const getVix = async () => {
    const dom = await JSDOM.fromURL(`${VixUrl}`, parserOptions);
    const { document } = dom.window;
    const value = document.querySelector<HTMLElement>('.QuoteStrip-lastPrice')?.textContent;
    const weekRange = document.querySelector<HTMLElement>('.QuoteStrip-fiftyTwoWeekRange')?.textContent;

    return { value, weekRange };
};
