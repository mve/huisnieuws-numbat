import React from 'react';
import axios from 'axios';
import Head from 'next/head';
import { ArrowLeftIcon } from '@heroicons/react/solid';
import { getSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import env from '../../support/env';
import Navbar from '../../components/core/Navbar';
import ArticleBanner from '../../components/article/ArticleBanner';
import {
  getPostDate, getDateSince, getReachNewsType, toSlug, getDetailPage,
} from '../../support/utils';
import { Article } from '../../types/article';
import { User } from '../../types/user';
import TagLabel from '../../components/core/TagLabel';
import { isLoggedIn, requestUser } from '../../support/session';
import CommentSection from '../../components/article/CommentSection';

type Props = {
  article: Article,
  author: User,
  user: User,
};

const ArticleComponent: React.FC<Props> = ({ article, author, user }) => {
  const router = useRouter();

  return (
    <main>
      <Head>
        <title>{`${article.title} | Huisnieuws`}</title>
      </Head>
      <Navbar />
      <ArticleBanner article={article} />
      <article className="mx-auto px-4 flex flex-col mt-18 sm:mt-20 md:mt-24 max-w-5xl">
        <div className="flex justify-between sm:flex-row flex-col">
          <a
            onClick={() => router.back()}
            onKeyDown={() => router.back()}
            role="button"
            tabIndex={0}
            className="self-baseline transition-all bg-gray-400 hover:bg-gray-500 text-white py-2 px-4 rounded-md flex"
          >
            <ArrowLeftIcon width="20" className="mr-2" />
            Terug naar overzicht
          </a>
          <div className="flex flex-column items-baseline flex-wrap">
            {article.tags.map((tag) => (
              <TagLabel {...tag} key={tag.name} className="mr-2" />
            ))}

            <div className="ml-5">
              <span
                className="text-gray-500 text-sm uppercase pr-2 border-r border-gray-400"
                id="zipcode"
              >
                {article.zipcode}
              </span>
              <span
                className="text-gray-500 uppercase pl-2 text-sm"
                id="reach"
              >
                {getReachNewsType(article)}
              </span>
            </div>
          </div>
        </div>

        <div className="text-gray-500 mt-16" id="date">
          <p>{getPostDate(article)}</p>
          <p>
            {article.createdAt !== article.updatedAt && `Laatste update: ${getDateSince(article.updatedAt)}`}
          </p>
        </div>

        <h1
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800 mb-10 mt-3"
        >
          {article.title}
        </h1>
        <p className="py-4 text-lg leading-8 text-gray-700">{article.text}</p>

        <div className="py-4 my-10 text-sm text-gray-600 border-t-2 border-b-2" id="author">
          {`Door: ${author.name}`}
        </div>

        <CommentSection article={article} user={user} />
      </article>
    </main>
  );
};

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  const { params: { id } } = context;

  try {
    const article: Article = (await axios.get(`${env('NEXT_PUBLIC_API_URL')}/articles/${id[0]}`))?.data;
    const author: User = (await axios.get(`${env('NEXT_PUBLIC_API_URL')}/users/${article.author}`))?.data;

    if (id[1] !== toSlug(article.title)) {
      return {
        redirect: {
          permanent: false,
          destination: getDetailPage(article),
        },
      };
    }

    let user = '';

    if (isLoggedIn(session)) {
      const { data } = await requestUser(session);
      user = data;
    }

    return { props: { article, author, user } };
  } catch {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }
};

export default ArticleComponent;
