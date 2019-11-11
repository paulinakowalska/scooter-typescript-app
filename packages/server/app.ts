const express = require('express');
const bodyParser = require('body-parser');
const loggerMiddleware = require('./middlewares/loggerMiddleware');
const routes = require('./routes');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(loggerMiddleware);

app.use('/api', routes);

module.exports = app;
