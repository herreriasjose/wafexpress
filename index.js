const express = require('express');

const waf = require('./lib/wafnode');
const logger = require('./lib/logger');

const app = express();

const port = 8080;

app.use(waf({ option1: '1', option2: '2' }));
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port);
logger.info(`Serving at port ${port}`);
