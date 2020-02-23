import express from 'express';
import helmet from 'helmet';
import routes from './routes';
import cors from 'cors';
import { get } from 'lodash';
import 'reflect-metadata';
import loggerMiddleware from './middlewares/loggerMiddleware';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleWare from 'webpack-hot-middleware';
import webpack from 'webpack';
import config from '../../rent-app/webpack.config';

import addAuth from './auth';

const app = express();

app.use(cors({ origin: '*' }));
app.use(helmet());

if (process.env.NODE_ENV !== 'production') {
    const compiler = webpack(config as object);
    app.use(
        webpackDevMiddleware(compiler, {
            publicPath: get(config, 'output.publicPath', '/public'),
            stats: {
                assets: false,
                chunkModules: false,
                chunks: false,
                colors: true,
                hash: false,
                timings: false,
                version: false,
            },
        }),
    );
    app.use(webpackHotMiddleWare(compiler));
}

// app.use(bodyParser.json());

const { protect, loginRequired } = addAuth(app);
app.use(loggerMiddleware);

app.get('/logged-out', (req, res) => {
    res.send('USER LOGGED OUT!');
});

app.use('/api', routes);

app.get('*', async (req, res) => {
    res.contentType('text/html');
    try {
        res.write(`
<!DOCTYPE html>
<html lang="eg">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />

    <title>Rent app</title>
</head>

<body>
<div id="root"></div>
<noscript>
    You need to enable JavaScript to run this app.
</noscript>
<script src="dist/bundle.js"></script>
</body>

</html>
           `);
    } catch (e) {
        res.status(500).end(`Something went wrong. Sorry!<br />${e.message}`);
    }
});

export default app;
