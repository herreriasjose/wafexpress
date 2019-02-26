const { it, expect } = global;
const ScannerSQLInjection = require('../lib/modules/moduleSQLInjection')


describe('module ScannerSQLInjection suite', () => {

  it('should return Object', () => {
    expect(typeof (new ScannerSQLInjection())).toBe('object');
  });

})

 

describe('module ScannerSQLIjection regex match', () => {
  const scanner = new ScannerSQLInjection();
  const digest = {
    header: 'dummy‘ or 1=1;--dummy',
  }
  const suspects = [];
  scanner.scan(digest, suspects);
  expect(suspects.length).toBe(1);


})