/** This file provides a list of rules for detecting XSS Attacks */

const rules = [
  {
    id: 1,
    group: 'XSS Attack',
    example: '',
    chain: [
      {
        method: 'GET|POST',
        pattern: 'XSSAttack'
      },
      {
        pattern: undefined
      }
    ]
  },
  {
    id: 2,
    group: 'XSS Attack',
    example: '',
    chain: [
      {
        method: 'GET|POST',
        pattern: ''
      },
      {
        pattern: undefined
      }
    ]
  }
];

module.exports = rules;
