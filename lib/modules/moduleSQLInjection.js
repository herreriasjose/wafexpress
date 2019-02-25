const rules = require('../rules/rulesSQLInjection');
const logger = require('../logger');


class ScannerSQLInjection {


  constructor() {
    this.requestParsed = '';
  }

  getText(element) {


    if (element !== undefined) {

      if (typeof (element) === 'object') Object.entries(element).forEach((obj) => this.requestParsed = this.requestParsed.concat(obj) + ' ')
      else if (typeof (element) === 'string') this.requestParsed = this.requestParsed.concat(element) + ' '

    }

    
   
  }

  scan(digest, suspects) {
    logger.info("Performing SQLInjection scans...")

    
    this.getText(digest.header);
    this.getText(digest.body);
    this.getText(digest.queryString);



    for (const i in rules) {
      const rule = rules[i];

      for (const j in rule.chain) {
        const pattern = rule.chain[j].pattern;

        if (pattern) {
          const regex = new RegExp(pattern);
          if (regex.test(this.requestParsed)) {
            logger.danger(`Found possible attack: ${pattern}`)
            suspects.push({ 'ip': digest.ip, 'time': Date.now(), 'attack': pattern })
          }
        }
      }
    }
  }
}


module.exports = ScannerSQLInjection;
