/**
 * Wafnode is a middleware that acts as a Web Application Firewall
 */

/**
 * Module dependencies.
 * @private
 */

const url = require('url');

const logger = require('./logger');
const scan = require('./modules/moduleSQLInjection');

/**
 * Shows portions of the HTML request.
 *
 * @param {Object} [pieces]
 * @public
 */

function showDigest(pieces) {
  console.log(pieces);
}


/**
 * Get the IP of the request
 *
 * @param {Object} [req]
 * @return {string}
 */

function getIP(req) {
  let { ip } = req;
  // Try to find a not localhost url
  if (ip.indexOf('127') === 0) {
    ip = req.headers['x-client-ip'] || req.headers['x-forwarded-for'] || ip;
  }
  return ip;
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

    let digest = {};

    if (req.method === 'GET') {
      digest = {

        method: req.method,
        header: req.headers,

      };

     // showDigest(digest);
     scan(digest);

    } else if (req.method === 'POST') {
      let data = '';
      req.on('data', (chunk) => { data += chunk; });
      req.on('end', () => {
        digest = {

          method: req.method,
          header: req.headers,
          contentType: req.headers['content-type'],
          body: data,
        };

        // showDigest(digest);
        scan(digest);
      });
    }


    logger.info('Filtered');
    logger.info(getIP(req));

    

    next();

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
