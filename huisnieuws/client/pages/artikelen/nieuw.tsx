import React, { useState } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import { getSession } from 'next-auth/client';
import { InferGetServerSidePropsType } from 'next';
import Link from 'next/link';
import { v4 as uuid } from 'uuid';
import { ArticleForm } from '../../components/article/ArticleForm';
import Navbar from '../../components/core/Navbar';
import { Article } from '../../types/article';
import { User } from '../../types/user';
import { getDetailPage, isImage, imageSizeToLarge } from '../../support/utils';
import { hasWritePerms } from '../../support/session';
import { Reach } from '../../enums/reach';

type Props = {
  article: Article,
};

const ArticleLink: React.FC<Props> = ({ article }) => (
  <span>
    Artikel succesvol toegevoegd, klik&nbsp;
    <Link href={getDetailPage(article)}>
      <a className="underline">hier</a>
    </Link>
    &nbsp;om het artikel te bekijken
  </span>
);

type newProps = {
  user: User
};

const NewArticle: React.FC<newProps> = ({ user }
  : InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [titleBorder, setTitleBorder] = useState<string>('');
  const [zipcodeBorder, setZipcodeBorder] = useState<string>('');
  const [imageBorder, setImageBorder] = useState<string>('');

  const resetBorders = (): void => {
    setTitleBorder('');
    setZipcodeBorder('');
    setImageBorder('');
  };

  const buildArticle = (
    title: string,
    zipcode: string,
    text: string,
    image: string,
    reach: Reach,
    tags: Array<string>,
  )
    : Object => ({
    title, zipcode, text, image, reach, author: user._id, tags,
  });
  const uploadImage = async (image: any, name: string) => {
    const body = new FormData();
    body.append('file', image);
    body.append('name', name);

    return axios.post('/api/file', body);
  };

  const addArticle = async (
    title: string,
    zipcode: string,
    text: string,
    image: any,
    reach: Reach,
    tags: Array<string>,
  ): Promise<any> => {
    const extension = image.name.split('.').pop();
    const imageName = `${uuid()}.${extension}`;
    const article = buildArticle(title, zipcode, text, imageName, reach, tags);

    try {
      if (!isImage(image)) throw new Error('Afbeelding is onjuist formaat.');
      if (!imageSizeToLarge(image.size, 10000000)) throw new Error('Bestandsgrootte van afbeelding is te groot.'); // 10000000 bytes -> 10 mb

      const postResult = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/articles`,
        article,
        {
          headers: { userId: user._id },
        },
      );

      await uploadImage(image, imageName);
      resetBorders();
      toast.success(<ArticleLink article={postResult.data} />);
      return postResult.data;
    } catch (e) {
      resetBorders();
      if (e.response?.data?.type === 'zipcode') setZipcodeBorder('red');
      if (e.response?.data?.type === 'title') setTitleBorder('red');
      if (e?.message === 'Afbeelding is onjuist formaat.') setImageBorder('border-red-500');
      if (e?.message === 'Bestandsgrootte van afbeelding is te groot.') setImageBorder('border-red-500');
      toast.error(`${e.response?.data?.error ?? e.message}`);
      return e;
    }
  };

  return (
    <div className="window__screen">
      <Toaster position="bottom-right" reverseOrder={false} toastOptions={{ duration: 5000 }} />
      <Navbar />
      <main className="base-container">
        <h1 className="base-title mt-5">Artikel plaatsen</h1>
        <ArticleForm
          onSubmit={addArticle}
          errors={{ zipcode: zipcodeBorder, title: titleBorder, image: imageBorder }}
        />
      </main>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  const { perms, user, ...obj } = await hasWritePerms(session);

  if (!perms) return { ...obj.redirectToAuth.obj };

  return {
    props: { user },
  };
};

export default NewArticle;
