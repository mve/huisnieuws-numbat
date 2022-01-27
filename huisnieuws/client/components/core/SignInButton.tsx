import React from 'react';
import { signIn } from 'next-auth/client';
import { useRouter } from 'next/router';

const SignInButton: React.FC<{ provider: any }> = ({ provider }) => {
  const router = useRouter();
  const { callbackUrl } = router.query;
  return (
    <button
      className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
      type="button"
      id="login-provider-button"
      onClick={() => signIn(provider.id, { callbackUrl: `${callbackUrl}` })}
    >
      {`Log in met ${provider.name}`}
    </button>
  );
};
export default SignInButton;
