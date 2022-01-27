import React from 'react';
import ArticleCard from './ArticleCard';
import { Article } from '../../types/article';

type Props = {
  articles: Article[],
  loading: boolean,
};

const ArticleList: React.FC<Props> = ({ articles, loading }) => (
  <section id="article-list" className="article-list w-full lg:w-2/3 pr-5">
    {articles.map((article) => <ArticleCard key={article._id} article={article} />)}
    {articles.length === 0 && !loading && (
      <p>Er zijn geen artikelen gevonden, probeer het later opnieuw.</p>
    )}
  </section>
);

export default ArticleList;
