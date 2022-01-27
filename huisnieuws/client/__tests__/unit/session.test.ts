import '@testing-library/jest-dom';
import { UserRole } from '../../enums/userRole';
import {
  isLoggedIn,
  rolesMatch,
} from '../../support/session';

const userSessionMail = {
  user: {
    mail: 'testemail@test.mail.com',
  },
};

const userObject = {
  _id: '61af2f888a28c74f146c95a2',
  name: 'Test User',
  email: 'testemail@test.mail.com',
  imageUrl: 'https://monstar-lab.com/global/wp-content/uploads/sites/11/2019/04/male-placeholder-image.jpeg',
  role: 'poster',
  __v: 0,
};

const emptyUser = {};

describe('session: user check', () => {
  it('user should be logged in', () => {
    expect(isLoggedIn(userSessionMail)).toBeTruthy();
  });
  it('user should not be logged in', () => {
    expect(isLoggedIn(emptyUser)).toBeFalsy();
  });
});

describe('check the user their role', () => {
  it('the user should not have the admin role', () => {
    expect(rolesMatch(userObject.role, UserRole.ADMIN)).toBeFalsy();
  });
  it('the user should not have the user role', async () => {
    expect(rolesMatch(userObject.role, UserRole.USER)).toBeFalsy();
  });
  it('the user should have the poster role', async () => {
    expect(rolesMatch(userObject.role, UserRole.POSTER)).toBeTruthy();
  });
});
