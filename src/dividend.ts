import { getDocumentElement, getText } from './utils';

const url = 'https://www.marketwatch.com/investing/stock';

export const getCompanyDividend = async (ticker: string) => {
    const document = await getDocumentElement(`${url}/${ticker}`);
    const dividiend = getText(
        document,
        '#maincontent > div.region.region--primary > div:nth-child(2) > div.group.group--elements.left > div > ul > li:nth-child(11) > span.primary'
    );

    return dividiend ?? '';
};
