/** This file provides a list of rules for detecting SQL Injection Attacks */

// analysis types
exports.rules = [
  {
    id: 250,
    why: 'SQL injection',
    level: 3,
    enable: true,
    chain: [
      {
        where: 'GET|POST',
        what: "^[-\\d';].+\\w.+(?:--[\\x00-\\x20\\x7f]*|#|\/\\*)$",
        operator: 5,
        normalize: true,
        capture: 1,
      },
      {
        what: "(?:\\b|\\d)(?:alter|(?:group_)?concat(?:_ws)?|benchmark|create|database|delete|drop|(?:dump|out)file|extractvalue|grant|insert|is\\s+(?:not\\s+)?null|limit|load(?:_file)?|order\\s+by|password|rename|r?like|select|sleep|substring|table|truncate|union|update|version)\\b",
        what_flags: 'i',
        operator: 5,
        normalize: true,
      },
    ],
  },
];
