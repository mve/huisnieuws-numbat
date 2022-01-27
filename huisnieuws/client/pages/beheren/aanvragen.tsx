import React from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getSession } from 'next-auth/client';
import axios from 'axios';
import Head from 'next/head';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import Navbar from '../../components/core/Navbar';
import { hasAdminPerms } from '../../support/session';
import env from '../../support/env';
import { RoleQueueList } from '../../components/admin/RoleQueueList';
import { User } from '../../types/user';

const AdminRoleQueue = ({ user, roleQueue, users }
  : InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const acceptUserRoleUpgrade = async (id: any) => {
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/role-queue/${id}`,
        {},
        { headers: { userid: user._id } },
      );
      toast.success('De rol van gebruiker is geupdate.');
      router.push(router.asPath);
    } catch (e) {
      toast.error(e.response?.data?.error ?? e?.message);
    }
  };

  const rejectUserRoleUpgrade = async (id: any) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/role-queue/${id}`,
        { headers: { userid: user._id } },
      );
      toast.success('De aanvraag is succesvol afgewezen');
      router.push(router.asPath);
    } catch (e) {
      toast.error(e.response?.data?.error ?? e?.message);
    }
  };

  return (
    <>
      <Head>
        <title>Beheren | Huisnieuws</title>
      </Head>
      <Navbar />
      <main className="mt-20 container mx-auto px-4 flex flex-col min-h-screen">
        <RoleQueueList
          users={users}
          roleQueue={roleQueue}
          accept={acceptUserRoleUpgrade}
          decline={rejectUserRoleUpgrade}
        />
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const { perms, user, ...obj } = await hasAdminPerms(session);

  if (!perms) return { ...obj.redirectToAuth.obj };

  const { data: roleQueue } = await axios.get(`${env('NEXT_PUBLIC_API_URL')}/role-queue/all`, {
    headers: {
      userid: user._id,
    },
  });
  let users: User[] = [];
  if (roleQueue.length > 0) {
    users = await Promise.all(roleQueue.map(async (item: any) => {
      const { data: user } = await axios.get(`${env('NEXT_PUBLIC_API_URL')}/users/${item.userId}`);
      return user;
    }));
  }

  return { props: { user, roleQueue, users } };
};

export default AdminRoleQueue;
