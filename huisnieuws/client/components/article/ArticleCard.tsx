/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';
import { ChatAltIcon } from '@heroicons/react/solid';
import { Article } from '../../types/article';
import { getDetailPage, getReachNewsType, getDateSince } from '../../support/utils';
import TagLabel from '../core/TagLabel';

type Props = {
  article: Article
};

const ArticleCard: React.FC<Props> = ({ article }) => (
  <Link href={getDetailPage(article)} passHref>
    <a
      className="h-60 p-5 rounded-lg mb-10 flex items-end is-darkened relative overflow-hidden"
      title={article.title}
    >
      <img
        className="z-negative"
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
        src={`/api/file/${article.image}`}
        alt={article.title}
      />
      <div className="absolute top-4 right-4 flex items-center z-20">
        <div className="mr-5 items-center hidden md:flex">
          <span className="zipcode text-white text-sm uppercase pr-2 border-r border-white">
            {article.zipcode}
          </span>
          <span className="reach text-white uppercase pl-2 text-sm pr-2 border-r border-white">
            {getReachNewsType(article)}
          </span>
          <span
            className={`date-since text-white uppercase pl-2 text-sm pr-2 ${article.comments.length > 0 ? 'border-r border-white' : ''}`}
          >
            {getDateSince(article.createdAt)}
          </span>
          {article.comments.length > 0 && (
            <span className="comments text-white uppercase pl-2 text-sm pr-2 flex">
              <ChatAltIcon width="15" className="mr-1" />
              {article.comments.length}
            </span>
          )}
        </div>
        {article.tags.map((tag, index) => (
          <TagLabel
            key={tag.name}
            name={tag.name}
            color={tag.color}
            className={index !== article.tags.length - 1 && 'mr-2'}
          />
        ))}
      </div>
      <h2 className="card-title z-10">{article.title}</h2>
    </a>
  </Link>
);

export default ArticleCard;
