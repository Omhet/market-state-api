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
