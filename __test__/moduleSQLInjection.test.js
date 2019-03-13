const { it, expect } = global;
const ScannerSQLInjection = require('../lib/modules/moduleSQLInjection');

let suspects = []

beforeEach(() => {
   
   
  suspects.length = 0;
  
})


describe('module ScannerSQLInjection suite', () => {
  it('should return Object', () => {
    expect(typeof new ScannerSQLInjection()).toBe('object');
  });

  it('regex match header attack',  () => {
    const scanner = new ScannerSQLInjection();
    const digest = {
      header: 'dummy‘ or 1=1;--dummy'
    };
   
    scanner.scan(digest, suspects);
    expect(suspects.length).toBe(1);
  } );

  it('regex match body attack', () => {
    const scanner = new ScannerSQLInjection();
    const digest = {
      body: 'name=dummy&password=%E2%80%98+or+1%3D1%3B--'
    };
   
    scanner.scan(digest, suspects);
    expect(suspects.length).toBe(1);
  });

  it('amount of warnings', () => {
 
    const scanner = new ScannerSQLInjection();
    const digest = {
      header: 'dummy‘ or 1=1;--dummy'
    };
   
    scanner.scan(digest, suspects);
    expect(suspects[0].warnings).toBeGreaterThan(0);
  });

});

 






