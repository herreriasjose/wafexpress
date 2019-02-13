const express = require('express');
const path = require('path');

const waf = require('./lib/wafnode');
const logger = require('./lib/logger');

const app = express();
app.use(express.static(path.join(__dirname, 'static')));

const port = 8080;


app.use(waf({ option1: '1', option2: '2' }));
app.get('/', (req, res) => {
  res.sendFile('index.html');
});

app.listen(port);
logger.info(`Serving at port ${port}`);
