const qs = require('querystring');

function extractText(element) {
  let textExtracted = '';

  if (element !== undefined) {
    if (typeof element === 'object') {
      Object.entries(element).forEach(obj => {
        let json = qs.parse(obj);
        json = JSON.stringify(json);
        textExtracted = textExtracted.concat(obj) + ' ';
      });
    } else if (typeof element === 'string') {
     
      let json = qs.parse(element);
      json = JSON.stringify(json);
      
      textExtracted = textExtracted.concat(element) + ' ';
      textExtracted = textExtracted.concat(json) + ' ';
      // workaround double backslash
      textExtracted = textExtracted.replace(/\\\\/g,'\\');
      
    }
  }

  return textExtracted;
}

module.exports = extractText;
