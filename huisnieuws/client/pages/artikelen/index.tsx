import React, { useEffect, useState } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import ArticleList from '../../components/article/ArticleList';
import Navbar from '../../components/core/Navbar';
import Sidebar from '../../components/core/Sidebar';
import ReachSelector from '../../components/core/ReachSelector';
import TagSelector from '../../components/core/TagSelector';
import { Reach } from '../../enums/reach';
import { Article } from '../../types/article';
import { Tag } from '../../types/tag';

const Articles = ({ zipcode }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [reach, setReach] = useState<Reach>(Reach.STREET);
  const [tags, setTags] = useState<any[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const { postcode } = router.query;

  useEffect(() => {
    const formatTags: Tag[] = tags.map((tag) => ({ name: tag.label, color: tag.color }));

    const fetchArticles = async () => {
      const filteredArticles = (await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/articles`, {
        params: {
          zipcode,
          reach,
          formatTags,
        },
      })).data ?? [];
      setArticles(filteredArticles);
      setLoading(false);
    };
    fetchArticles();
  }, [zipcode, reach, tags]);

  return (
    <>
      <Head>
        <title>Artikel overzicht | Huisnieuws</title>
      </Head>
      <Navbar />
      <main className="base-container mt-40">

        {zipcode === null && (
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800 pb-4">
            Overzicht van alle artikelen
          </h1>
        )}

        {zipcode !== null && (

          <>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800 pb-4">
              {`Overzicht van artikelen voor postcode ${zipcode}`}
            </h1>

            <div className="bg-gray-100 p-5 pb-0 mb-10 rounded-xl">

              <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold text-gray-800 pb-4">
                Filters
              </h2>

              <div className="flex max-w-screen-lg flex-wrap">

                <div className="pr-8">
                  <ReachSelector
                    selected={reach}
                    onChange={setReach}
                    title="Selecteer het bereik waarin je wilt zoeken"
                  />
                </div>

                <div>
                  <TagSelector
                    maxAmountTags={3}
                    onChange={setTags}
                    title="Selecteer tags waarop je wilt filteren"
                    selected={[]}
                  />
                </div>

              </div>

            </div>
          </>

        )}
        <div className="flex flex-col-reverse lg:flex-row">
          <ArticleList articles={articles} loading={loading} />
          {zipcode !== null && (
            <Sidebar reach={reach} zipcode={String(postcode)} articles={articles} />
          )}
        </div>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => (
  { props: { zipcode: query.postcode ?? null } }
);

export default Articles;
