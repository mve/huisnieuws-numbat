import axios from 'axios';
import { UserRole } from '../enums/userRole';

const isLoggedIn = (session: any): boolean => !!session && session && !!session.user;

const rolesMatch = (userRole: string, expectedRole: string)
: boolean => userRole === expectedRole;

const redirectToAuth = {
  perms: false,
  obj: {
    redirect: {
      destination: '/auth/signin',
      permanent: false,
    },
  },
};

const requestUser = async (session) => {
  const { user } = session;
  return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users?email=${user.email}`);
};

const hasUserPerms = async (session) => {
  if (!isLoggedIn(session)) return { redirectToAuth };

  const { data: user } = await requestUser(session);

  if (!rolesMatch(user.role, UserRole.USER)) return { redirectToAuth };

  return {
    perms: true,
    user,
  };
};

const hasWritePerms = async (session) => {
  if (!isLoggedIn(session)) return { redirectToAuth };

  const { data: user } = await requestUser(session);

  if (rolesMatch(user.role, UserRole.USER)) return { redirectToAuth };

  return {
    perms: true,
    user,
  };
};

const hasAdminPerms = async (session) => {
  if (!isLoggedIn(session)) return { redirectToAuth };

  const { data: user } = await requestUser(session);

  if (!rolesMatch(user.role, UserRole.ADMIN)) return { redirectToAuth };

  return {
    perms: true,
    user,
  };
};

export {
  isLoggedIn, hasUserPerms, hasWritePerms, hasAdminPerms, requestUser, rolesMatch,
};
