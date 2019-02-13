/** This file provides a list of the available items in the menus */

// analysis types
exports.types = [
  { name: 'SQL Injection', description: 'Attack on web database' },
  { name: 'XSS Attack', description: 'Execute malicious script in victim\'s browser' },
];
exports.typesPlain = exports.types.map(o => `${o.name} (${o.description})`); // convert to one line
