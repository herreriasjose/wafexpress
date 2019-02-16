const rules = require('../rules/rulesSQLInjection');
const logger = require('../logger');


function scan(digest) {
    for (const i in rules) {
      const rule = rules[i];

      for (const j in rule.chain) {
        const pattern = rule.chain[j].pattern;

        const h = `${digest.header}`;
        const b = `${digest.body}`;

        console.log('Header received:', h);
        console.log('Body received:', b);

        if (pattern) {
          const r = new RegExp(pattern);
          console.log('Pattern', r);
          if (r.test(b)) logger.danger(`Found possible attack!`)
          console.log('\n');
        }
      }
    }
  }


module.exports = scan;
