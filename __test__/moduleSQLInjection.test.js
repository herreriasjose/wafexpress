const { it, expect } = global;
const ScannerSQLInjection = require('../lib/modules/moduleSQLInjection');

describe('module ScannerSQLInjection suite', () => {
  it('should return Object', () => {
    expect(typeof new ScannerSQLInjection()).toBe('object');
  });
});

describe('module ScannerSQLIjection regex match header attack', () => {
  const scanner = new ScannerSQLInjection();
  const digest = {
    header: 'dummy‘ or 1=1;--dummy'
  };
  const suspects = [];
  scanner.scan(digest, suspects);
  expect(suspects.length).toBe(1);
});


describe('module ScannerSQLIjection regex match body attack', () => {
  const scanner = new ScannerSQLInjection();
  const digest = {
    body: 'name=dummy&password=%E2%80%98+or+1%3D1%3B--'
  };
  const suspects = [];
  scanner.scan(digest, suspects);
  expect(suspects.length).toBe(1);
});

