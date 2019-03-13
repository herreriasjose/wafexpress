const rules = require('../rules/rulesSQLInjection');
const logger = require('../logger');
const extractText = require('../textExtractor');

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

        if (pattern) {
          
          
          const regex = new RegExp(pattern);
          if (regex.test(this.requestParsed)) {
            logger.danger(`Found possible attack: ${pattern}`);
         
            let found = suspects.find(element => {
              if (element.ip === digest.ip) {
                element.warnings++;
                return element;
              }
            });
            if (!found) {
              suspects.push({ ip: digest.ip, time: Date.now(), warnings: 1 });
            }
          }
        }
      }
    }
  }
}

module.exports = ScannerSQLInjection;
