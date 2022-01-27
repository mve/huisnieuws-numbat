import React from 'react';
import { PencilIcon } from '@heroicons/react/outline';
import { Comment } from '../../types/comment';
import { getDateSince } from '../../support/utils';
import RoleIcon from '../core/RoleIcon';

type Props = {
  comment: Comment,
  authorId: string
};

const CommentCard: React.FC<Props> = ({ comment, authorId }) => {
  const isAuthor = authorId === comment.commenter._id;
  let extraClasses = '';

  if (isAuthor) {
    extraClasses = 'bg-blue-50';
  }

  return (
    <div className={`relative shadow-lg border rounded-lg p-4 pb-8 my-6 ${extraClasses}`}>
      <div className="flex items-center mb-2">
        <span className="text-lg font-bold mr-2">{comment.commenter.name}</span>
        <RoleIcon role={comment.commenter.role} />

        <span
          className="text-xs text-gray-700 pl-2 font-normal"
        >
          {getDateSince(comment.updatedAt)}
        </span>
      </div>
      <div className="break-words">{comment.comment}</div>

      {isAuthor && (
        <div className="absolute right-3 bottom-2 w-14 h-5 flex items-center">
          <PencilIcon />
          <span className="text-xs text-gray-700">Auteur</span>
        </div>
      )}

    </div>
  );
};

export default CommentCard;
