import Image from 'next/image';
import React, { MouseEventHandler, useState } from 'react';
import ProceedAdminModal from './ProceedAdminModal';
import { getDateSince } from '../../support/utils';
import { User } from '../../types/user';

type queueItemProps = {
    user: User,
    accept: MouseEventHandler<HTMLButtonElement>,
    decline: MouseEventHandler<HTMLButtonElement>,
    roleQueue: Array<any>,
  };

const RoleQueueItem: React.FC<queueItemProps> = ({
  user, accept, decline, roleQueue,
}) => {
  const { _id: id, createdAt } = roleQueue.find((elem) => elem.userId === user._id);
  const date = getDateSince(createdAt);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState(null);
  return (
    <>
      <li className="list-none justify-between flex-1 flex my-2 group">
        <section className="flex flex-col w-full">
          <span>{user.name}</span>
          <div className="flex max-w-xs w-3/5 justify-between flex-col md:flex-row">
            <span className="text-sm text-gray-600">{user.email}</span>
            <span className="text-sm text-gray-600">{date}</span>
          </div>
        </section>

        <div className="flex w-2/5 justify-end">
          <button className="mr-1 bg-green-400 px-3 py-1 rounded text-white flex justify-center items-center invisible group-hover:visible" type="button" onClick={() => { setShowModal(true); setModalType('accept'); }}>
            <Image
              layout="fixed"
              objectFit="cover"
              objectPosition="center"
              priority
              src="/icons/check.svg"
              width="24px"
              height="24px"
            />
          </button>
          <button className="mr-3 bg-red-400 text-white px-3 py-1 rounded flex justify-center items-center invisible group-hover:visible" type="button" onClick={() => { setShowModal(true); setModalType('decline'); }}>
            <Image
              layout="fixed"
              objectFit="cover"
              objectPosition="center"
              priority
              src="/icons/remove.svg"
              width="24px"
              height="24px"
            />
          </button>
        </div>
      </li>
      <hr />

      {modalType === 'accept' && (
        <ProceedAdminModal
          show={showModal}
          cancel={setShowModal}
          proceedAction={accept}
          roleQueueId={id}
          color="bg-green-500"
          bText="Accepteer"
          mTitle="Accepteer de gebruiker"
          mText="De gebruiker zal de rol: 'Poster' ontvangen."
          hover="hover:bg-green-700"
        />
      )}
      {modalType === 'decline' && (
        <ProceedAdminModal
          show={showModal}
          cancel={setShowModal}
          proceedAction={decline}
          roleQueueId={id}
          color="bg-red-400"
          bText="Afwijzen"
          mTitle="Verwijs de aanvraag"
          mText="De gebruiker zal niet een rol ontvangen."
          hover="hover:bg-red-700"
        />
      )}
    </>
  );
};

export default RoleQueueItem;
export { RoleQueueItem };
