import React, { ReactElement } from 'react';
import { getProviders, getSession } from 'next-auth/client';
import SignInButton from '../../components/core/SignInButton';
import Navbar from '../../components/core/Navbar';
import { isLoggedIn } from '../../support/session';

const SignIn: React.FC<{ providers: any }> = ({ providers }): ReactElement => (
  <>
    <Navbar />

    <div className="flex justify-center items-center h-screen flex-col">

      <h1 className="text-2xl font-bold mb-5">Inloggen bij Huisnieuws</h1>

      {Object.values(providers)
        .map((provider: any) => <SignInButton key={provider.name} provider={provider} />)}

    </div>
  </>

);

export async function getServerSideProps(context) {
  const providers = await getProviders();
  const session = await getSession(context);
  const perms = isLoggedIn(session);

  if (perms) {
    return {
      redirect: {
        destination: '/profiel',
        permanent: false,
      },
    };
  }
  return {
    props: { providers },
  };
}

export default SignIn;
