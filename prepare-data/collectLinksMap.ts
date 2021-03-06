import { writeFile } from 'fs';
import { getArray, getDocumentElement, getLink, getText } from '../src/utils';

const mainUrl = 'https://simplywall.st';
const RuMarketUrl = 'https://simplywall.st/stocks/ru';

const collectLinks = async () => {
    const doc = await getDocumentElement(RuMarketUrl);

    const lastPageLink = getLink(doc, '[data-cy-id="last"]');
    const lastPage = Number((lastPageLink?.match(/page=(.+)/) ?? [])[1]) ?? 1;

    const links = getLinks(doc);

    console.log(links);

    writeFile('links.json', JSON.stringify(links), (err) => {
        if (err) throw err;
        console.log('complete');
    });
};

const getLinks = (doc: Document) => {
    return getArray(
        doc,
        '[data-cy-id="stocks-table-row"] td:nth-child(2) > a'
    ).map((el) => {
        const link = el.getAttribute('href') ?? undefined;
        const ticker = getText(el, 'b');
        const name = getText(el, 'span');
        return {
            link,
            ticker,
            name,
        };
    });
};

collectLinks();