
const validUrl = require('valid-url');


module.exports = function checkUrl(url) {
  if (validUrl.isUri(url)) {
    return true;
  }
  return false;
};
