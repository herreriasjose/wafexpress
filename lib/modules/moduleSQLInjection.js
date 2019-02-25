const rules = require('../rules/rulesSQLInjection');
const logger = require('../logger');


class ScannerSQLInjection {

  scan(digest, suspects) {
    logger.info("Performing SQLInjection scans...")

    let plainText = "";    

    if(digest.header !== undefined) Object.entries(digest.header).forEach((ele) => plainText = plainText.concat(ele) + ' ');
    if(digest.body !== undefined) plainText = plainText.concat(digest.body);

    logger.info(`Request: ${plainText}`);

    for (const i in rules) {
      const rule = rules[i];

      for (const j in rule.chain) {
        const pattern = rule.chain[j].pattern;



        if (pattern) {
          const regex = new RegExp(pattern);
          if (regex.test(plainText)) {
            logger.danger(`Found possible attack: ${pattern}`)
            suspects.push({ 'ip': digest.ip, 'time': Date.now(), 'attack': pattern })
          }
        }
      }
    }
  }
}


module.exports = ScannerSQLInjection;
