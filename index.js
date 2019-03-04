const express = require('express');
const path = require('path');

const {wafNode, getIP} = require('./lib/wafnode');

const logger = require('./lib/logger');

const app = express();
app.use(express.static(path.join(__dirname, 'static')));

const port = 8080;

let suspects = [];

app.use(wafNode({ modules: ["ScannerSQLInjection","ScannerXSSAttack"], suspects: suspects, option3: 3 }));


app.get('/', (req, res) => {
   
  res.sendFile('index.html');
  
  
});

app.post('/api/scan', (req, res) => {
  console.log(getIP(req))
  console.log(suspects)
  res.send("Reached endpoint")
});

app.get('/api/scan', (req, res) => {
  console.log(getIP(req))
  console.log(suspects)
  res.send("Reached endpoint")
});

app.listen(port);
logger.info(`Serving at port ${port}`);
