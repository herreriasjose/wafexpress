const express = require('express');
const path = require('path');

const waf = require('./lib/wafnode');
const logger = require('./lib/logger');

const app = express();
app.use(express.static(path.join(__dirname, 'static')));

const port = 8080;


app.use(waf({ modules: ["ScannerSQLInjection","ScannerXSSAttack"], option2: '2' }));
app.get('/', (req, res) => {
  res.sendFile('index.html');
});
app.post('/api/scan', (req, res) => {
  res.send("Reached endpoint")
});

app.listen(port);
logger.info(`Serving at port ${port}`);
