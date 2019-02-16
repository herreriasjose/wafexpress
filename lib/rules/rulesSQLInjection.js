/** This file provides a list of rules for detecting SQL Injection Attacks */

const rules = [
  {
    id: 1,
    group: 'SQL injection',
    example: '',
    chain: [
      {
        method: 'GET|POST',
        pattern: "\\d\\s+procedure\\s+analyse\\b",
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
        pattern: "^.{0,100}\\ssleep\\s\\d+",
      },
      {
        pattern: undefined,
      },
    ],
  },
];



module.exports = rules;