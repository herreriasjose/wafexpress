const express = require('express');

const waf = require('./lib/wafexpress');
const logger = require('./lib/logger');

const app = express();

const port = 8080;

app.use(waf);
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port);
logger.info(`Serving at port ${port}`);
