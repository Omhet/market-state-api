import compression from 'compression';
import cors from 'cors';
import cache from 'express-aggressive-cache';
import express from 'express';
import { getFearAndGreedIndex } from './parsers';

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

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Your app is listening on port ' + port);
});