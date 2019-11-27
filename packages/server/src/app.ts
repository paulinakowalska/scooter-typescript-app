import express from 'express';
import bodyParser from 'body-parser';
import loggerMiddleware from './middlewares/loggerMiddleware';
import routes from './routes';
import cors from 'cors';

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(loggerMiddleware);

app.use('/api', routes);

export default app;
