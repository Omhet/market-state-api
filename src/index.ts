import compression from 'compression';
import cors from 'cors';
import cache from 'express-aggressive-cache';
import express from 'express';
import { getFearAndGreedIndex, getVix, getUsdRub } from './parsers';
import { getCompanyReport } from './company/report';
import { searchForCompany } from './company/search';

const app = express();

app.use(cors());
app.use(compression());

app.use(
    cache({
        maxAge: 3600,
    }).middleware
);

app.get('/fgi', async (_req, res) => {
    const data = await getFearAndGreedIndex();
    res.json({
        data,
    });
});

app.get('/vix', async (_req, res) => {
    const data = await getVix();
    res.json({
        data,
    });
});

app.get('/usd', async (_req, res) => {
    const data = await getUsdRub();
    res.json({
        data,
    });
});

app.get('/company', async (req, res) => {
    const { url } = req.query;
    const data = await getCompanyReport(String(url));
    res.json({
        data,
    });
});

app.get('/search', async (req, res) => {
    const { q } = req.query;
    if (!q) {
        res.status(400).json({
            error: {
                message: 'Required param "q" is undefined',
            },
        });
        return;
    }

    const data = await searchForCompany(String(q));
    res.json({ data });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Your app is listening on port ' + port);
});
