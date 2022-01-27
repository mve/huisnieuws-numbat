import React, { MouseEventHandler } from 'react';
import { Toaster } from 'react-hot-toast';
import { UserRole } from '../../enums/userRole';
import { User } from '../../types/user';
import RoleIcon from '../core/RoleIcon';
import { RoleQueueItem } from './RoleQueueItem';

type RoleQueueProps = {
  users: Array<User>,
  accept: MouseEventHandler<HTMLButtonElement>,
  decline: MouseEventHandler<HTMLButtonElement>,
  roleQueue: Array<any>
}

const RoleQueueList: React.FC<RoleQueueProps> = ({
  users, accept, decline, roleQueue,
}) => (
  <>
    <Toaster position="bottom-right" reverseOrder={false} toastOptions={{ duration: 5000 }} />
    <h2 className="text-2xl sm:text-4xl text-gray-900 font-bold mt-10 mb-6">
      Aanvragen voor Poster
    </h2>
    <span className="pb-4 flex items-center gap-2">
      Aanvragen voor:
      <RoleIcon role={UserRole.POSTER} />
    </span>

    <div className="shadow border-[1px] p-2 rounded flex flex-col">
      {users.length > 0 && <hr />}
      {users.length > 0 && users.map((user: User) => (
        <RoleQueueItem
          roleQueue={roleQueue}
          key={user._id}
          user={user}
          accept={accept}
          decline={decline}
        />
      )) }
      {users.length === 0 && <p>Er zijn op het moment geen aanvragen gedaan.</p>}
    </div>
  </>
);

export default RoleQueueList;
export { RoleQueueList };
