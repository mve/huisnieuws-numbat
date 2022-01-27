import React from 'react';
import CommentCard from './CommentCard';
import { Comment } from '../../types/comment';

type Props = {
  comments: Comment[],
  authorId: string
};

const CommentList: React.FC<Props> = ({ comments, authorId }) => {
  const sortedComments = comments.sort((a, b) => (
    new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()));

  return (
    <section className="comment-list w-full lg:w-2/3 mx-auto">
      {sortedComments.map((comment) => (
        <CommentCard
          comment={comment}
          authorId={authorId}
          key={comment._id}
        />
      ))}
      {sortedComments.length === 0 && <p className="text-center text-bold my-4">Er zijn nog geen reacties geplaatst.</p>}
    </section>
  );
};

export default CommentList;
