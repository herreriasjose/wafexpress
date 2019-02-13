
const { it, expect, describe } = global;
const checkUrl = require('../lib/urlChecker');

describe('urlChecker test suite', () => {
  it('should return true', () => expect(checkUrl('http://google.com')).toBe(true));
  it('should return false', () => expect(checkUrl('::google.com')).toBe(false));
  it('should return false', () => expect(checkUrl('')).toBe(false));
});
