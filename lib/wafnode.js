/**
 * Wafnode is a middleware that acts as a Web Application Firewall
 */

/**
 * Module dependencies.
 * @private
 */

const url = require('url');

const logger = require('./logger');
const scanners = require('./modules/index');


/**
 * Shows portions of the HTML request.
 *
 * @param {Object} [pieces]
 * @public
 */

function showDigest(pieces) {
  logger.info(pieces);
}


/**
 * Get the IP of the request
 *
 * @param {Object} [req]
 * @return {string}
 */

function getIP(req) {
  let { ip } = req;
  // Try to find not localhost url in case it exists
  if (ip.indexOf('127') === 0) {
    ip = req.headers['x-client-ip'] || req.headers['x-forwarded-for'] || ip;
  }
  return ip;
}


/**
 * Perfoms the scans
 *
 * @param {Object} [digest]
 * @param {Object} [modules]
 * @param {function} [next]
 * @public
 */


function runScans(digest, modules, suspects, res, next) {


  //showDigest(digest);

  let scanner = null;
  for (let module of modules) {


    switch (module) {
      case 'ScannerSQLInjection':
        {
          scanner = new scanners.ScannerSQLInjection();
          break;
        }
      case 'ScannerXSSAttack':
        {
          scanner = new scanners.ScannerXSSAttack();
          break;
        }
      default:
        scanner = null;
        logger.error(`Module ${module} does not exist.`)
        break;
    }

    if (scanner) {

      scanner.scan(digest,suspects);
    }

  }



  logger.info('Filtered');
  logger.info(digest.ip);

  res.suspect = true;

  

  next();

  /* const blocked = false;
  if (blocked === true) {
    res.send('Banned');
  } else {
    next();
  } */


}

/**
 * Scans requests searching for anything fishy.
 *
 * @param {Object} [options]
 * @return {Function} middleware
 * @public
 */


function wafNode(options) {

  const opts = options || { modules: { ScannerSQLInjection, ScannerXSSAttack } };

  // options

  const modules = opts.modules;
  const suspects = opts.suspects;

  return function filter(req, res, next) {

    let digest = {};

    if (req.method === 'GET') {
      digest = {

        method: req.method,
        header: req.headers,
        ip: getIP(req)

      };

      runScans(digest, modules, suspects, res, next)

    } else if (req.method === 'POST') {

      let data = '';
      req.on('data', (chunk) => { data += chunk; });
      req.on('end', () => {
        digest = {

          method: req.method,
          header: req.headers,
          contentType: req.headers['content-type'],
          body: data,
          ip: getIP(req)
        };

        runScans(digest, modules, suspects, res, next)
      });
    }



  };
}


/**
 * Module exports.
 */

module.exports = wafNode;
