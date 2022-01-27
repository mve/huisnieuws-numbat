/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { zipcodeIsValid } from '../../support/zipcode';

describe('Zipcode', () => {
  it('should be valid', () => {
    expect(zipcodeIsValid('1234AF'))
      .toBeTruthy();
  });

  it('should be invalid', () => {
    expect(zipcodeIsValid('asdf12'))
      .toBeFalsy();

    expect(zipcodeIsValid('asdf123'))
      .toBeFalsy();

    expect(zipcodeIsValid('asdf  12'))
      .toBeFalsy();
  });
});
