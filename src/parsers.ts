import { JSDOM } from 'jsdom';
import { getCompanyReportData } from './company';
import { getBackroundImage, getDocumentElement, getText } from './utils';

const FearAndGreedIndexUrl = 'https://money.cnn.com/data/fear-and-greed';
const VixUrl = 'https://www.cnbc.com/quotes/.VIX';
const UsdRubUrl = 'https://www.marketwatch.com/investing/currency/usdrub';

export const getFearAndGreedIndex = async () => {
    const doc = await getDocumentElement(FearAndGreedIndexUrl);

    return getBackroundImage(doc, '#needleChart');
};

export const getVix = async () => {
    const doc = await getDocumentElement(VixUrl);

    const value = getText(doc, '.QuoteStrip-lastPrice');
    const weekRange = getText(doc, '.QuoteStrip-fiftyTwoWeekRange');

    return { value, weekRange };
};

export const getUsdRub = async () => {
    const doc = await getDocumentElement(UsdRubUrl);

    const value = getText(doc, '.intraday__price .value');
    const weekRange = doc.querySelectorAll('.kv__item .primary')[2]
        ?.textContent;

    return { value, weekRange };
};

export const getCompanyReport = async (companyUrl: string) => {
    const doc = await getDocumentElement(companyUrl);
    return getCompanyReportData(doc);
};

// TODO: Search for a company by a ticker or name
export const searchForCompany = async () => {
    const dom = await JSDOM.fromURL('https://simplywall.st/stocks/ru', {
        runScripts: 'dangerously',
    });
    const { document } = dom.window;
    const state = dom.window.REDUX_STATE;
    const state2 = dom.window.__REACT_QUERY_STATE__;
    console.log(state2.queries[0].state);
};
