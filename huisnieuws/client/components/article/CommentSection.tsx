import React, { useState } from 'react';
import { signIn, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Article } from '../../types/article';
import { User } from '../../types/user';
import TextAreaInput from '../form/TextAreaInput';
import InputCounter from '../core/InputCounter';
import CommentList from './CommentList';

type Props = {
  article: Article,
  user: User,
};

const CommentSection: React.FC<Props> = ({ article, user }) => {
  const [session] = useSession();
  const router = useRouter();
  const [commentText, setCommentText] = useState<string>('');
  const [error, setError] = useState<string>('');
  const maxLength: number = 400;

  const saveComment = async () => {
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/articles/${article._id}/comments`, {
      comment: commentText,
    }, {
      headers: {
        userid: user._id,
      },
    })
      .then(async () => {
        // Empty comment input field.
        setCommentText('');
        setError('');
        await router.push(router.asPath, undefined, { scroll: false });
      })
      .catch((err) => {
        setError(err.response.data);
      });
  };

  return (
    <>
      {!session && (
        <button
          type="button"
          onClick={() => (!router.pathname.includes('auth/signin') ? signIn() : null)}
        >
          <span id="comment-login" className="sm:hover:underline">
            Log in om een reactie achter te laten.
          </span>
        </button>
      )}
      {session && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            saveComment();
          }}
        >

          <TextAreaInput
            value={commentText}
            name="newComment"
            label="Laat een reactie achter."
            placeholder="Reactie..."
            maxLength={maxLength}
            onChange={setCommentText}
          />
          <InputCounter currentLength={commentText.length} maxLength={maxLength} />

          <button
            id="submit-comment"
            type="submit"
            disabled={!commentText}
            className="transition-all disabled:opacity-50 disabled:cursor-not-allowed max-w-[12rem] inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Plaatsen
          </button>
          {error === 'Reactie is te lang' && <p className="pl-3 inline-flex justify-center text-red-500">Reactie is te lang</p>}
        </form>

      )}

      <CommentList comments={article.comments} authorId={article.author} />

    </>

  );
};

export default CommentSection;
