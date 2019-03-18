const http = require('http');
const logger = require('./lib/logger');

const server = http.createServer();

const port = 8080;

let handler = function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
};


server.addListener('request', handler);
server.listen(port);

logger.info(`Http module server listening at port ${port}`);
