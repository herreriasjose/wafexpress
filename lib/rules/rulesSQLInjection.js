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
        pattern: `(?:\\\\b|\\\\d)(?:ceil|concat|conv|floor|version)\\\\b`,
      },
      {
        pattern: undefined,
      },
    ],
  },
  {
    id: 4,
    group: 'SQL injection',
    example: '',
    chain: [
      {
        method: 'GET|POST',
        pattern: "[-\\\\d';].+\\\\w.+(?:--[\\\\x00-\\\\x20\\\\x7f]*|#|\\/\\\\*)",
      },
      {
        pattern: undefined,
      },
    ],
  },
  {
    id: 5,
    group: 'SQL injection',
    example: '',
    chain: [
      {
        method: 'GET|POST',
        pattern: ".{0,10}\\\\bselect\\\\b\\\\s.{1,150}\\\\bfrom\\\\b.",
      },
      {
        pattern: undefined,
      },
    ],
  },
  {
    id: 6,
    group: 'SQL injection',
    example: '',
    chain: [
      {
        method: 'GET|POST',
        pattern: "union all select",
      },
      {
        pattern: undefined,
      },
    ],
  },
  {
    id: 7,
    group: 'SQL injection',
    example: '',
    chain: [
      {
        method: 'GET|POST',
        pattern: ".{0,10}\\\\border\\\\s+by\\\\s+\\\\d",
      },
      {
        pattern: undefined,
      },
    ],
  },
  
];



module.exports = rules;