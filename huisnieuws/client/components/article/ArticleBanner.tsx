/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Article } from '../../types/article';

type Props = {
  article: Article,
}

const ArticleBanner: React.FC<Props> = ({ article }) => (
  <section className="mt-20 h-72 p-5 mb-10 relative bg-no-repeat bg-cover bg-center overflow-hidden">
    <img
      style={{
        boxSizing: 'border-box',
        width: '100%',
        height: 'initial',
        position: 'absolute',
        inset: '0px',
        background: 'none',
        objectFit: 'cover',
        objectPosition: 'center',
        padding: '0px',
        border: 'none',
        margin: 'auto',
        display: 'block',
      }}
      loading="lazy"
      className="z-negative"
      src={`/api/file/${article.image}`}
      alt={article.title}
    />
  </section>
);

export default ArticleBanner;
