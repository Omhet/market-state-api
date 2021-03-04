import { JSDOM } from 'jsdom';
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

    const name = getText(doc, '[data-cy-id="company-header-title"]');
    const summary = getText(doc, '[data-cy-id="company-summary-desc"] span');
    const thesis = getText(doc, '[data-cy-id="company-fundamentals-desc"]');

    let risksAndRewardsRaw = Array.from(
        doc.querySelectorAll('[data-cy-id="risk-reward-wrapper"] > *')
    ).map((el) => el.textContent);
    risksAndRewardsRaw = risksAndRewardsRaw.slice(
        0,
        risksAndRewardsRaw.length - 2
    );
    const riskIndex = risksAndRewardsRaw.indexOf('Risk Analysis');
    const rewards = risksAndRewardsRaw.slice(1, riskIndex);
    const risks = risksAndRewardsRaw.slice(riskIndex + 1);

    return { name, summary, thesis, risksAndRewards: { rewards, risks } };
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
