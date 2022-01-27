import React from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getSession } from 'next-auth/client';
import Head from 'next/head';
import Navbar from '../../components/core/Navbar';
import { hasAdminPerms } from '../../support/session';

const Admin = ({ user }: InferGetServerSidePropsType<typeof getServerSideProps>) => (
  <>
    <Head>
      <title>Beheren | Huisnieuws</title>
    </Head>
    <Navbar />
    <p>{`welkom ${user.name}`}</p>
  </>
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const { perms, user, ...obj } = await hasAdminPerms(session);

  if (!perms) return { ...obj.redirectToAuth.obj };

  return { props: { user } };
};

export default Admin;
