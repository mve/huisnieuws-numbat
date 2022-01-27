/* eslint-disable @next/next/link-passhref */
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Article } from '../../types/article';
import RemoveArticleModal from './RemoveArticleModal';
import { getDetailPage } from '../../support/utils';

type Props = {
  article: Article
  removeArticle: Function
};

const ProfileArticleCard: React.FC<Props> = ({ article, removeArticle }) => {
  const [toggleModal, setToggleModal] = useState<boolean>(false);

  const showModal = () => setToggleModal(true);

  return (
    <>
      <Link passHref href={getDetailPage(article)}>
        <div
          className="group h-60 p-5 rounded-lg mb-10 flex is-darkened relative overflow-hidden bg-no-repeat bg-cover bg-center cursor-pointer"
          style={{ backgroundImage: `url("/api/file/${article.image}")` }}
        >
          <div className="flex items-end">
            <a title={article.title}>
              <h1 className="text-white text-base sm:text-2xl font-bold">{article.title}</h1>
            </a>
          </div>
          <Link href={`/artikelen/${article._id}/bewerk`}>
            <a
              className="flex items-start absolute top-2 right-12 invisible group-hover:visible"
            >
              <Image
                src="/icons/edit.svg"
                alt="icon"
                width="30px"
                height="30px"
              />
            </a>
          </Link>
          <Link href="/profiel" passHref>
            <div
              className="flex items-start absolute top-2 right-2 invisible group-hover:visible"
            >
              <button onClick={showModal} type="button">
                <Image
                  src="/icons/remove.svg"
                  alt="icon"
                  width="30px"
                  height="30px"
                />
              </button>
            </div>
          </Link>
        </div>
      </Link>
      <RemoveArticleModal
        show={toggleModal}
        onHide={() => setToggleModal(false)}
        article={article}
        removeArticle={removeArticle}
      />

    </>
  );
};

export default ProfileArticleCard;
