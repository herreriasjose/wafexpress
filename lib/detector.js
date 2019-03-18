
const logger = require('./logger');

function detecter(digest,request, pattern, suspects  ) {

    if (pattern) {
          
          
        const regex = new RegExp(pattern);
        if (regex.test(request)) {
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



module.exports = detecter;