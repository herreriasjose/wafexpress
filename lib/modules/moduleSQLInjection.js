const rules = require('../rules/rulesSQLInjection');
const logger = require('../logger');
const extractText = require('../textExtractor');
const detecter = require('../detecter')

/**
 * Perfoms scans to check SQL Injection
 */

class ScannerSQLInjection {
  constructor() {
    this.requestParsed = '';
  }

  scan(digest, suspects) {
    logger.info('Performing SQLInjection scans...');

    this.requestParsed = this.requestParsed.concat(extractText(digest.header));
    this.requestParsed = this.requestParsed.concat(extractText(digest.body));
    this.requestParsed = this.requestParsed.concat(extractText(digest.queryString)
    );
 
    for (const i in rules) {
      const rule = rules[i];

      for (const j in rule.chain) {
        const pattern = rule.chain[j].pattern;

          detecter(digest, this.requestParsed, pattern, suspects);



      }
    }
  }
}

module.exports = ScannerSQLInjection;
