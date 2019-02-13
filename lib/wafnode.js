/**
 * Wafnode is a middleware that acts as Web Application Firewall
 */

/**
 * Module dependencies.
 * @private
 */

const url = require('url');

const logger = require('./logger');

/**
 * Shows portions of the HTML request.
 *
 * @param {Object} [pieces]
 * @public
 */

function showPieces(pieces) {
  console.log(pieces);
}


/**
 * Scans request searching for anything fishy.
 *
 * @param {Object} [options]
 * @return {Function} middleware
 * @public
 */


function wafNode(options) {
  // const opts = options || {};

  // options

  // let modules = opts.modules;

  return function filter(req, res, next) {
    if (req.method === 'GET') {
      const pieces = {

        method: req.method,
        header: req.headers,

      };

      showPieces(pieces);
    } else if (req.method === 'POST') {
      let data = '';
      req.on('data', (chunk) => { data += chunk; });
      req.on('end', () => {
        const pieces = {

          method: req.method,
          header: req.headers,
          contentType: req.headers['content-type'],
          data,
        };

        showPieces(pieces);
      });
    }


    logger.info('Filtered');
    logger.info(req.ip);


    /* const blocked = false;
    if (blocked === true) {
      res.send('Banned');
    } else {
      next();
    } */
  };
}


/**
 * Module exports.
 */

module.exports = wafNode;
