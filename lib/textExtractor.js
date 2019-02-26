

 function extractText(element) {
  
  let textExtracted = "";
  
  if (element !== undefined) {

    if (typeof (element) === 'object') Object.entries(element).forEach((obj) => textExtracted = textExtracted.concat(obj) + ' ')
    else if (typeof (element) === 'string') textExtracted = textExtracted.concat(element) + ' '

  }

  return textExtracted;

};



module.exports = extractText;