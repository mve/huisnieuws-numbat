/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { checkLength } from '../../support/checker';

describe('check the Lengths', () => {
  it('should be correct lenghts', () => {
    expect(checkLength('12345', 4, 6))
      .toBeTruthy();
    expect(checkLength('asdf', 3, 5))
      .toBeTruthy();
  });
  it('should not match lengths', () => {
    expect(checkLength('12345', 1, 2))
      .toBeFalsy();
    expect(checkLength('asdf', 3, 3))
      .toBeFalsy();
  });
});
