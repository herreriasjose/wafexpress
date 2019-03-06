/** This file provides a list of rules for detecting SQL Injection Attacks */

const rules = [
  {
    id: 1,
    group: 'SQL injection',
    example: '',
    chain: [
      {
        method: 'GET|POST',
        pattern: "‘\\sor\\s1=1;--",
      },
      {
        pattern: undefined,
      },
    ],
  },
  {
    id: 2,
    group: 'SQL injection',
    example: '',
    chain: [
      {
        method: 'GET|POST',
        pattern: "(?:admin(?:istrator)?)['\"].*?(?:--| #|\/\\*)",
      },
      {
        pattern: undefined,
      },
    ],
  },
  {
    id: 3,
    group: 'SQL injection',
    example: '',
    chain: [
      {
        method: 'GET|POST',
        pattern: "(?:\\b|\\d)(?:ceil|concat|conv|floor|version)\\b",
      },
      {
        pattern: undefined,
      },
    ],
  },
];



module.exports = rules;