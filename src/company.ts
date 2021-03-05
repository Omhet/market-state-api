import { getArray, getText, getTextArray } from './utils';

export const getCompanyReportData = (doc: Document) => {
    const name = getText(doc, '[data-cy-id="company-header-title"]');
    const info = getTextArray(
        doc,
        '[data-cy-id="report-sub-section-key-information"] li'
    );
    const sector = findString(info, 'Sector');
    const industry = findString(info, 'Industry');
    const summary = getText(doc, '[data-cy-id="company-summary-desc"] span');
    const thesis = getText(doc, '[data-cy-id="company-fundamentals-desc"]');

    const insights = getInsights(doc);
    const risksAndRewards = getRisksAndRewards(
        doc.querySelectorAll('[data-cy-id="risk-reward-wrapper"] > *')
    );
    const perf = getPerfReport(
        doc.querySelectorAll(
            '[data-cy-id="report-sub-section-market-performance"] h4 + div'
        )
    );
    const fairValue = getPercentText(
        doc,
        '[data-cy-id="key-metric-value-undervalued-compared-to-fair-value"]',
        '[data-cy-id="key-metric-title-undervalued-compared-to-fair-value"]'
    );
    const futureGrowth = getPercentText(
        doc,
        '[data-cy-id="key-metric-value-forecasted-annual-earnings-growth"]',
        '[data-cy-id="key-metric-title-forecasted-annual-earnings-growth"]'
    );
    const pastPerf = getPercentText(
        doc,
        '[data-cy-id="key-metric-value-historical-annual-earnings-growth"]',
        '[data-cy-id="key-metric-title-historical-annual-earnings-growth"]'
    );
    const dividend = getPercentText(
        doc,
        '[data-cy-id="key-metric-value-current-dividend-yield"]',
        '[data-cy-id="key-metric-title-current-dividend-yield"]'
    );
    const management = getPercentText(
        doc,
        '[data-cy-id="key-metric-value-average-management-tenure"]',
        '[data-cy-id="key-metric-title-average-management-tenure"]'
    );

    return {
        name,
        summary,
        sector,
        industry,
        thesis,
        info,
        risksAndRewards,
        perf,
        fairValue,
        futureGrowth,
        pastPerf,
        dividend,
        management,
        insights,
    };
};

const findString = (arr: string[], searchStr: string) => {
    const regExp = new RegExp(`${searchStr}:\\s(.+)`, 'i');
    const [_, found] =
        arr.find((str) => str.includes(searchStr))?.match(regExp) ?? [];

    return found;
};

const getPercentText = (
    doc: Document,
    selectorPercent: string,
    selectorText: string
) => {
    const percent = getText(doc, selectorPercent);
    const text = getText(doc, selectorText);
    return { percent, text };
};

const getInsights = (doc: Document) => {
    const latestPrice = getInsightsArray(
        doc,
        '[data-cy-id="report-sub-section-latest-share-price-and-events"] p'
    );
    const perf = getInsightsArray(
        doc,
        '[data-cy-id="report-sub-section-market-performance"] blockquote p'
    );
    const fairValue = getInsightsArray(
        doc,
        '[data-cy-id="report-sub-section-share-price-vs-fair-value"] p'
    );
    const pe = getInsightsArray(
        doc,
        '[data-cy-id="report-sub-section-price-to-earnings-ratio"] p'
    );
    const peg = getInsightsArray(
        doc,
        '[data-cy-id="report-sub-section-price-to-earnings-growth-ratio"] p'
    );
    const pb = getInsightsArray(
        doc,
        '[data-cy-id="report-sub-section-price-to-book-ratio"] p'
    );
    const futureGrowth = getInsightsArray(
        doc,
        '[data-cy-id="report-sub-section-analyst-future-growth-forecasts"] p'
    );
    const futureRoe = getInsightsArray(
        doc,
        '[data-cy-id="report-sub-section-future-return-on-equity"] p'
    );
    const earningsAndRevenueHistory = getInsightsArray(
        doc,
        '[data-cy-id="report-sub-section-earnings-and-revenue-history"] p'
    );
    const pastEarningsGrowth = getInsightsArray(
        doc,
        '[data-cy-id="report-sub-section-past-earnings-growth-analysis"] p'
    );
    const roe = getInsightsArray(
        doc,
        '[data-cy-id="report-sub-section-return-on-equity"] p'
    );
    const financialPosition = getInsightsArray(
        doc,
        '[data-cy-id="report-sub-section-financial-position-analysis"] p'
    );
    const deHistory = getInsightsArray(
        doc,
        '[data-cy-id="report-sub-section-debt-to-equity-history-and-analysis"] p'
    );

    const vsMarket = getInsightsArray(
        doc,
        '[data-cy-id="report-sub-section-dividend-yield-vs-market"] p'
    );
    const stabilityAndGrowth = getInsightsArray(
        doc,
        '[data-cy-id="report-sub-section-stability-and-growth-of-payments"] p'
    );
    const currentPayout = getInsightsArray(
        doc,
        '[data-cy-id="report-sub-section-current-payout-to-shareholders"] p'
    );
    const futurePayout = getInsightsArray(
        doc,
        '[data-cy-id="report-sub-section-future-payout-to-shareholders"] p'
    );

    const ceoCompensation = getInsightsArray(
        doc,
        '[data-cy-id="report-sub-section-ceo-compensation-analysis"] p'
    );

    const insiderTrading = getInsightsArray(
        doc,
        '[data-cy-id="report-sub-section-insider-trading-volume"] p'
    );
    const ownershipBreakdown = getInsightsArray(
        doc,
        '[data-cy-id="report-sub-section-ownership-breakdown"] p'
    );

    return {
        latestPrice,
        perf,
        fairValue,
        pe,
        peg,
        pb,
        futureGrowth,
        futureRoe,
        earningsAndRevenueHistory,
        pastEarningsGrowth,
        roe,
        financialPosition,
        deHistory,
        dividend: {
            vsMarket,
            stabilityAndGrowth,
            currentPayout,
            futurePayout,
        },
        ceoCompensation,
        insiderTrading,
        ownershipBreakdown,
    };
};

const getInsightsArray = (element: Element | Document, selector: string) => {
    return getArray(element, selector).map((el) => {
        const value = el.querySelector('[value]')?.getAttribute('value');
        const text = el.textContent;
        return {
            value,
            text,
        };
    });
};

const getPerfReport = (elements: NodeListOf<Element>) => {
    const [weekPerfEl, yearPerfEl] = elements;
    const week = getPerf(weekPerfEl);
    const year = getPerf(yearPerfEl);

    return {
        week,
        year,
    };
};

const getPerf = (element: Element) => {
    const [selfTitle, industryTitle, marketTitle] = getTextArray(element, 'h4');
    const [selfValue, industryValue, marketValue] = getTextArray(element, 'p');
    return {
        [String(selfTitle)]: selfValue,
        [String(industryTitle)]: industryValue,
        [String(marketTitle)]: marketValue,
    };
};

const getRisksAndRewards = (elements: NodeListOf<Element>) => {
    let risksAndRewardsRaw = Array.from(elements).map((el) => el.textContent);
    risksAndRewardsRaw = risksAndRewardsRaw.slice(
        0,
        risksAndRewardsRaw.length - 2
    );
    const riskIndex = risksAndRewardsRaw.indexOf('Risk Analysis');
    const rewards = risksAndRewardsRaw.slice(1, riskIndex);
    const risks = risksAndRewardsRaw.slice(riskIndex + 1);

    return { rewards, risks };
};
