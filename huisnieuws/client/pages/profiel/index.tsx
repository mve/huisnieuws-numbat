import React from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import axios from 'axios';
import Head from 'next/head';
import { getSession } from 'next-auth/client';
import ProfileArticleList from '../../components/article/ProfileArticleList';
import Navbar from '../../components/core/Navbar';
import env from '../../support/env';
import { isLoggedIn, requestUser } from '../../support/session';

const Profile:
  React.FC = ({ articles, user, isInUserQueue }
    : InferGetServerSidePropsType<typeof getServerSideProps>) => (
      <>
        <Head>
          <title>Profiel | Huisnieuws</title>
        </Head>
        <Navbar />
        <main className="mt-40 container mx-auto px-4 flex lg:flex-row flex-col">
          <ProfileArticleList
            articles={articles}
            user={user}
            isInUserQueue={isInUserQueue}
          />
        </main>
      </>
  );

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const perms = isLoggedIn(session);

  if (!perms) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const { data: user } = await requestUser(session);

  const { data } = await axios.get(`${env('NEXT_PUBLIC_API_URL')}/users/${user._id}/articles`);
  const articles = data ?? [];

  const { data: isInUserQueue } = await axios.get(`${env('NEXT_PUBLIC_API_URL')}/role-queue?userid=${user._id}`, {
    headers: {
      userid: user._id,
    },
  });

  return { props: { articles, user, isInUserQueue } };
};

export default Profile;
