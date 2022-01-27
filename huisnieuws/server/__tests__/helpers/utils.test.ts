import { formatZipcode } from '../../src/helpers/utils';

describe('Utilities', () => {
  it('should correctly format a zipcode', () => {
    expect(formatZipcode('1234 AB')).toBe('1234AB');
    expect(formatZipcode('1234 ab')).toBe('1234AB');
    expect(formatZipcode('1234aB')).toBe('1234AB');
  });
});
