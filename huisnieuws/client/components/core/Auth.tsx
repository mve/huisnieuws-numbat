import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';

const Auth = () => {
  const [session] = useSession();
  const router = useRouter();

  return (
    <div className="mr-2 grid place-items-start sm:place-items-center">
      {!session && (
        <button
          type="button"
          id="navbar-login-button"
          onClick={() => (!router.pathname.includes('auth/signin') ? signIn() : null)}
        >
          <span
            className="text-gray-900 sm:text-white sm:hover:underline"
          >
            Inloggen
          </span>
        </button>
      )}
      {session && (
        <button type="button" onClick={() => signOut()}>
          <span
            className="text-gray-900 sm:text-white sm:hover:underline"
          >
            Uitloggen
          </span>
        </button>
      )}

    </div>
  );
};

export default Auth;
