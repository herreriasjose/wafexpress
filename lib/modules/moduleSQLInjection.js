const rules = require('../rules/rulesSQLInjection');
const logger = require('../logger');



function scan(digest) {
    
    for(let i in rules){
        let rule = rules[i];
        console.log(i, rule.chain)
    }

}


module.exports = scan;
