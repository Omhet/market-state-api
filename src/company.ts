import { getText, getTextArray } from './utils';

export const getCompanyReportData = (doc: Document) => {
    const name = getText(doc, '[data-cy-id="company-header-title"]');
    const sector = getText(doc, '[data-cy-id="child-link-2"]');
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
    const fairValuePercent = getText(
        doc,
        '[data-cy-id="key-metric-value-undervalued-compared-to-fair-value"]'
    );
    const fairValueText = getText(
        doc,
        '[data-cy-id="key-metric-title-undervalued-compared-to-fair-value"]'
    );
    const fairValue = { fairValuePercent, fairValueText };

    return {
        name,
        sector,
        summary,
        thesis,
        risksAndRewards,
        insights,
        perf,
        fairValue,
    };
};

const getInsights = (doc: Document) => {
    const latestPrice = getTextArray(
        doc,
        '[data-cy-id="report-sub-section-latest-share-price-and-events"] p'
    );
    const perf = getTextArray(
        doc,
        '[data-cy-id="report-sub-section-market-performance"] blockquote p'
    );
    const fairValue = getTextArray(
        doc,
        '[data-cy-id="report-sub-section-share-price-vs-fair-value"] p'
    );
    const pe = getTextArray(
        doc,
        '[data-cy-id="report-sub-section-price-to-earnings-ratio"] p'
    );
    const peg = getTextArray(
        doc,
        '[data-cy-id="report-sub-section-price-to-earnings-growth-ratio"] p'
    );

    return {
        latestPrice,
        perf,
        fairValue,
        pe,
        peg
    };
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
