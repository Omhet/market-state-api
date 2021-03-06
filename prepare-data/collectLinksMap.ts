import { readFileSync, writeFile, writeFileSync } from 'fs';
import { join } from 'path';
import { getArray, getDocumentElement, getLink, getText } from '../src/utils';

const mainUrl = 'https://simplywall.st';
const RuMarketUrl = 'https://simplywall.st/stocks/ru';
const USMarketUrl = 'https://simplywall.st/stocks/us';

const collectLinks = async (url: string) => {
    console.log('Parsing the first page...');

    const doc = await getDocumentElement(url);

    const lastPageLink = getLink(doc, '[data-cy-id="last"]');
    const lastPage = Number((lastPageLink?.match(/page=(.+)/) ?? [])[1]) ?? 1;

    let links = getLinks(doc);

    for (let i = 2; i <= lastPage; i++) {
        console.log(`Getting links from page ${i}`);
        const pageLinks = await collectLinksFromPage(`${url}?page=${i}`);
        links = links.concat(pageLinks);
    }

    return links;
};

const collectLinksFromPage = async (url: string) => {
    const doc = await getDocumentElement(url);
    return getLinks(doc);
};

const getLinks = (doc: Document) => {
    return getArray(
        doc,
        '[data-cy-id="stocks-table-row"] td:nth-child(2) > a'
    ).map((el) => {
        let link = el.getAttribute('href') ?? undefined;
        link = link ? `${mainUrl}${link}` : undefined;
        const ticker = getText(el, 'b');
        const name = getText(el, 'span');
        return {
            link,
            ticker,
            name,
        };
    });
};

(async () => {
    const links = await collectLinks(USMarketUrl);
    writeFile(join(__dirname, 'companies-us.json'), JSON.stringify(links), (err) => {
        if (err) throw err;
        console.log('complete');
    });
})();

// Remap
// (() => {
//     const data = JSON.parse(readFileSync(join(__dirname, 'us.json'), 'utf8'));
//     const filtered = data.map(
//         ({
//             ticker,
//             name,
//             link,
//         }: {
//             ticker: string;
//             name: string;
//             link: string;
//         }) => ({
//             l: (link.match(/https:\/\/simplywall\.st(.+)/) ?? [])[1],
//             t: ticker,
//             n: name,
//         })
//     );
//     writeFileSync('us-p.json', JSON.stringify(filtered));
// })();
