import { JSDOM } from 'jsdom';
import { getBackroundImage } from './utils';

const parserOptions = {
    referrer: 'https://example.com/',
};

const FearAndGreedIndexUrl = 'https://money.cnn.com/data/fear-and-greed';
const VixUrl = 'https://www.cnbc.com/quotes/.VIX';
const UsdRubUrl = 'https://www.marketwatch.com/investing/currency/usdrub';

export const getFearAndGreedIndex = async () => {
    const dom = await JSDOM.fromURL(`${FearAndGreedIndexUrl}`, parserOptions);
    const { document } = dom.window;
    return getBackroundImage(document, '#needleChart');
};

export const getVix = async () => {
    const dom = await JSDOM.fromURL(`${VixUrl}`, parserOptions);
    const { document } = dom.window;
    const value = document.querySelector('.QuoteStrip-lastPrice')?.textContent;
    const weekRange = document.querySelector('.QuoteStrip-fiftyTwoWeekRange')
        ?.textContent;

    return { value, weekRange };
};

export const getUsdRub = async () => {
    const dom = await JSDOM.fromURL(`${UsdRubUrl}`, parserOptions);
    const { document } = dom.window;
    const value = document.querySelector('.intraday__price .value')
        ?.textContent;
    const weekRange = document.querySelectorAll('.kv__item .primary')[2]
        ?.textContent;

    return { value, weekRange };
};

// TODO: Search for a company by a ticker or name
export const getCompanyReport = async () => {
    const dom = await JSDOM.fromURL('https://simplywall.st/stocks/ru', {
        ...parserOptions,
        runScripts: 'dangerously',
        pretendToBeVisual: true,
    });
    const { document } = dom.window;
    const state = dom.window.REDUX_STATE;
    const state2 = dom.window.__REACT_QUERY_STATE__;
    console.log(state2.queries[0].state);
};
