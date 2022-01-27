import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast';
import ProfileArticleCard from './ProfileArticleCard';
import { Article } from '../../types/article';
import { User } from '../../types/user';
import RoleIcon from '../core/RoleIcon';
import { UserRole } from '../../enums/userRole';

type PropsNotification = {
  title: string,
};

const RemoveArticleNotification: React.FC<PropsNotification> = ({ title }) => (
  <span>
    Artikel:&nbsp;
    {title}
    , is succesvol verwijderd
  </span>
);

type Props = {
  articles: Article[],
  user: User,
  isInUserQueue: boolean
};

type ButtonProps = {
  text: string,
  isDisabled: boolean,
  onClickHandler: any
};

const ProfileButton: React.FC<ButtonProps> = ({
  text, isDisabled, onClickHandler,
}) => (
  <button
    onClick={onClickHandler}
    type="button"
    disabled={isDisabled}
    id="profile-button"
    className="transition-all disabled:opacity-50 disabled:cursor-not-allowed max-w-[12rem] inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
  >
    {text}
  </button>
);

const deleteEntityAndImage = async (user: User, { image, _id }: Article) => {
  await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/articles/${_id}`, {
    headers: {
      userid: user._id,
    },
  });
  await axios.delete(`/api/file/${image}`);
};

const ProfileArticleList: React.FC<Props> = ({ articles, user, isInUserQueue }) => {
  const router = useRouter();

  const removeArticle = async (article: Article) => toast.promise(
    deleteEntityAndImage(user, article),
    {
      loading: 'Artikel aan het verwijderen...',
      success: () => {
        router.replace(router.asPath);
        return <RemoveArticleNotification title={article.title} />;
      },
      error: 'Er is iets fout gegaan, probeer het later opnieuw.',
    },
  );

  const sendRoleRequest = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/role-queue`,
        {
          userId: user._id,
        },
        { headers: { userid: user._id } },
      );
      toast.success('Je aanvraag is succesvol ontvangen!');
      router.push(router.asPath);
    } catch (e) {
      toast.error(e.response?.data?.error.message || 'Er ging wat mis');
    }
  };

  return (
    <section className="w-full lg:w-2/3 pr-5">
      <Toaster position="bottom-right" reverseOrder={false} toastOptions={{ duration: 5000 }} />
      <div
        className="flex flex-col items-start pb-4 sm:flex-row sm:items-center justify-between"
      >
        <div className="flex items-center pb-5">
          <div className="w-24 h-24 flex items-center rounded-full">
            <Image
              className="rounded-full"
              src={user.imageUrl}
              alt="profile-picture"
              width="250px"
              height="250px"
            />
          </div>
          <div className="flex-col items-center">
            <div className="flex flex-col leading-none pl-4">
              <p className="text-base sm:text-2xl font-bold mb-1">{user.name}</p>
              <RoleIcon role={user.role} />
            </div>
          </div>
        </div>
        <div className="flex-col justify-self-start">
          {user.role === UserRole.USER && !isInUserQueue
            && (
            <ProfileButton
              onClickHandler={sendRoleRequest}
              isDisabled={false}
              text="Verifieer om te plaatsen"
            />
            )}
          {user.role === UserRole.USER && isInUserQueue
            && (
            <ProfileButton
              onClickHandler={() => {}}
              isDisabled
              text="Aanvraag in behandeling"
            />
            )}
          {user.role === UserRole.POSTER
            && (
            <ProfileButton
              onClickHandler={() => { router.push('/artikelen/nieuw'); }}
              isDisabled={false}
              text="Artikel plaatsen"
            />
            )}
          {user.role === UserRole.ADMIN
            && (
            <ProfileButton
              onClickHandler={() => {
                router.push('/beheren/aanvragen');
              }}
              isDisabled={false}
              text="Beheren dashboard"
            />
            )}
        </div>
      </div>
      {(articles.length === 0 && user.role === UserRole.POSTER) && (
        <p className="text-xl">
          Je hebt nog geen artikelen geplaatst.
        </p>
      )}
      {articles.length !== 0 && (
        <h1 className="text-1xl sm:text-4xl text-gray-900 font-bold mt-10 mb-6">
          Jouw artikelen
        </h1>
      )}
      {articles.map((article) => (
        <ProfileArticleCard
          key={article._id}
          article={article}
          removeArticle={removeArticle}
        />
      ))}
    </section>
  );
};

export default ProfileArticleList;
