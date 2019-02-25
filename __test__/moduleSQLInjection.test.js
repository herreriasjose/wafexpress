const { it, expect } = global;
const ScannerSQLInjection = require('../lib/modules/moduleSQLInjection')


describe('module ScannerSQLInjection suite', () => {

it('should return Object' , ()=> {
  expect(typeof (new ScannerSQLInjection())).toBe('object');
} );




})