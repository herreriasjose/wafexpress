/**
 * Wafnode is a middleware that acts as Web Application Firewall
 */

const logger = require('./logger');

function wafNode(options) {
  return function (req, res, next) {
    logger.info('Filtered');
    logger.info(req.ip);
    next();
  };
}


module.exports = wafNode;
