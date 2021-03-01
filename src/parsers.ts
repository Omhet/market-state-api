import { JSDOM } from 'jsdom';
import { getText, getImage, getLink, getBackroundImage } from './utils';

const parserOptions = {
    referrer: 'https://example.com/',
};

const FearAndGreedIndexUrl = 'https://money.cnn.com/data/fear-and-greed';

export const getFearAndGreedIndex = async () => {
    const dom = await JSDOM.fromURL(`${FearAndGreedIndexUrl}`, parserOptions);
    const { document } = dom.window;
    return getBackroundImage(document, '#needleChart');
};
