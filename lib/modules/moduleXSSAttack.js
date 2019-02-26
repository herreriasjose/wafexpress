const rules = require('../rules/rulesXSSAttack');
const logger = require('../logger');


class ScannerXSSAttack {


  constructor() {
    this.requestParsed = '';
  }

 

  scan(digest, suspects) {
    logger.info("Performing XSSAttack scans...")

  
    this.requestParsed = this.requestParsed.concat(extractText(digest.header));
    this.requestParsed = this.requestParsed.concat(extractText(digest.body));
    this.requestParsed = this.requestParsed.concat(extractText(digest.queryString));
    



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


module.exports = ScannerXSSAttack;
