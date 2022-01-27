import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import axios from 'axios';
import env from '../../../support/env';

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.Google({
      clientId: env('GOOGLE_CLIENT_ID'),
      clientSecret: env('GOOGLE_CLIENT_SECRET'),
    }),
    // ...add more providers here
  ],
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    redirect: async (url) => Promise.resolve(url),
    signIn: async (user) => {
      const newUser = {
        name: user.name,
        email: user.email,
        imageUrl: user.image,
      };

      try {
        await axios.post(`${env('NEXT_PUBLIC_API_URL')}/users`, newUser);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      }
      return true;
    },
  },
});
