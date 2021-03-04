import compression from 'compression';
import cors from 'cors';
import cache from 'express-aggressive-cache';
import express from 'express';
import { getFearAndGreedIndex, getCompanyReport, getVix, getUsdRub } from './parsers';

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

app.get('/company', async (_req, res) => {
    const data = await getCompanyReport();
    res.json({
        data,
    });
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Your app is listening on port ' + port);
});
