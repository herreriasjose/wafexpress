const { it, expect } = global;
const ScannerSQLInjection = require('../lib/modules/moduleSQLInjection')


describe('module ScannerSQLInjection suite', () => {

it('should return Object' , ()=> {
  expect(typeof (new ScannerSQLInjection())).toBe('object');
} );

})


describe('module ScannerSQLIjection utilities', () => {
  const scanner = new ScannerSQLInjection();
  

  it('should return 0' , ()=> { 
    
    expect(scanner.requestParsed.length).toBe(0)
  } );


  it('should return 13' , ()=> { 
    scanner.getText('Hello, World');
    expect(scanner.requestParsed.length).toBe(13)
  } );

  it('should return 13' , ()=> { 
    scanner.getText({value: 'dummy'});
    expect(scanner.requestParsed.length).toBe(25)
  } );

})