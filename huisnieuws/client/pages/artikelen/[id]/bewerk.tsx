import axios from 'axios';
import { InferGetServerSidePropsType } from 'next';
import { getSession } from 'next-auth/client';
import router from 'next/router';
import React, { useCallback, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Link from 'next/link';
import { v4 as uuid } from 'uuid';
import { EditTab } from '../../../components/article/EditTab';
import Navbar from '../../../components/core/Navbar';
import { checkLength } from '../../../support/checker';
import env from '../../../support/env';
import { zipcodeIsValid } from '../../../support/zipcode';
import { Article } from '../../../types/article';
import { getDetailPage, imageSizeToLarge, isImage } from '../../../support/utils';
import { hasWritePerms } from '../../../support/session';
import { Reach } from '../../../enums/reach';

type Props = {
  article: Article,
};

const ArticleLink: React.FC<Props> = ({ article }) => (
  <span>
    Artikel succesvol bewerkt, klik&nbsp;
    <Link href={getDetailPage(article)}>
      <a className="underline">hier</a>
    </Link>
    &nbsp;om het artikel te bekijken
  </span>
);

const EditPage = ({ article, user }:
                    InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { author, _id } = article;

  const [titleBorder, setTitleBorder] = useState<string>('');
  const [zipcodeBorder, setZipcodeBorder] = useState<string>('');
  const [imageBorder, setImageBorder] = useState<string>('');

  const resetBorders = (): void => {
    setTitleBorder('');
    setZipcodeBorder('');
    setImageBorder('');
  };

  const uploadImage = async (newImage: any, name: string) => {
    const body = new FormData();
    body.append('file', newImage);
    body.append('name', name);

    return axios.post('/api/file', body);
  };

  const fieldsSet = useCallback((title: string, zipcode: string, text: string): boolean => (
    !!title && !!zipcode && !!text
  ), []);

  const saveArticle = async (
    title: string,
    zipcode: string,
    text: string,
    image: any,
    reach: Reach,
    tags: Array<string>,
  ): Promise<any> => {
    try {
      if (!checkLength(title, 5, 100)
        || !zipcodeIsValid(zipcode)
        || !fieldsSet(title, zipcode, text)) throw new Error('Vul alle velden in.');
      let imageName = article.image;

      if (image) {
        if (!isImage(image)) throw new Error('Afbeelding is onjuist formaat.');
        if (!imageSizeToLarge(image.size, 10000000)) throw new Error('Bestandsgrootte van afbeelding is te groot.'); // 10000000 bytes -> 10 mb
        const extension = image.name.split('.').pop();
        imageName = `${uuid()}.${extension}`;
      }

      const updated = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/articles/${_id}`,
        {
          _id, title, text, zipcode, author, reach, image: imageName, tags,
        },
        { headers: { userId: user._id } },
      );

      if (image) {
        await Promise.all([
          uploadImage(image, imageName),
          axios.delete(`/api/file/${article.image}`),
        ]);
      }
      resetBorders();
      toast.success(<ArticleLink article={updated.data} />);
      router.push(router.asPath, undefined, { scroll: false });
      return updated.data;
    } catch (e) {
      resetBorders();
      if (e.response?.data?.type === 'zipcode') setZipcodeBorder('red');
      if (e.response?.data?.type === 'title') setTitleBorder('red');
      if (e?.message === 'Afbeelding is onjuist formaat.') setImageBorder('border-red-500');
      if (e?.message === 'Bestandsgrootte van afbeelding is te groot.') setImageBorder('border-red-500');
      toast.error(`${e.response?.data?.error ?? e.message}`);
      return e.response?.data?.error ?? e.message;
    }
  };

  const cancelEditArticle = (e: Event): void => {
    e.preventDefault();
    router.push('/profiel');
  };

  return (
    <div className="window__screen">
      <Toaster position="bottom-right" reverseOrder={false} toastOptions={{ duration: 5000 }} />
      <Navbar />
      <main className="base-container">
        <h1 className="base-title mt-5">Artikel bewerken</h1>
        <EditTab
          formData={article}
          saveArticle={saveArticle}
          cancelEditArticle={cancelEditArticle}
          errors={{ zipcode: zipcodeBorder, title: titleBorder, image: imageBorder }}
        />
      </main>
    </div>
  );
};

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  const { perms, user, ...obj } = await hasWritePerms(session);
  if (!perms) return { ...obj.redirectToAuth.obj };

  const { data: article } = await axios.get(`${env('NEXT_PUBLIC_API_URL')}/articles/${context.params.id}`);

  if (!article || user._id !== article.author) {
    return {
      redirect: {
        destination: '/profiel',
        permanent: false,
      },
    };
  }

  return {
    props: { article, user },
  };
}

export default EditPage;
