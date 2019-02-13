/**
 * WafExpress is a middleware that acts as Web Application Firewall
 */

const logger = require('./logger');

function wafExpress(req, res, next) {
  logger.info('Filtered');
  logger.info(req.ip);
  next();
}


module.exports = wafExpress;
