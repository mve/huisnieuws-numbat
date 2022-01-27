import React, { useState } from 'react';
import { BookOpenIcon, NewspaperIcon, ShieldCheckIcon } from '@heroicons/react/outline';
import { createPopper } from '@popperjs/core';

type Props = {
  role: string
};

const RoleIcon: React.FC<Props> = ({ role }) => {
  let icon;
  let iconClasses;
  let name;
  let description;

  const [popoverShow, setPopoverShow] = useState<boolean>(false);

  switch (role) {
    case 'user':
      name = 'Gebruiker';
      icon = <BookOpenIcon className="h-5" />;
      iconClasses = 'border border-solid border-black text-gray-700';
      description = 'Een gebruikersaccount.';
      break;

    case 'poster':
      name = 'Geverifieerd bedrijf';
      icon = <NewspaperIcon className="h-5" />;
      iconClasses = 'border border-solid border-yellow-500 text-yellow-500';
      description = 'Een bedrijf dat door Huisnieuws is geverifieerd.';
      break;

    case 'admin':
      name = 'Beheerder';
      icon = <ShieldCheckIcon className="h-5" />;
      iconClasses = 'border border-solid border-indigo-600 text-indigo-600';
      description = 'Een beheerder van Huisnieuws.';
      break;

    default:
      name = '';
      icon = '';
      iconClasses = '';
      description = '';
      break;
  }

  const openPopover = () => {
    createPopper(document.getElementById('btnRef'), document.getElementById('popoverRef'), {
      placement: 'bottom-start',
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 10],
          },
        },
      ],
    });
    setPopoverShow(true);
  };

  const closePopover = () => {
    setPopoverShow(false);
  };

  return (
    <div>

      <button
        id="btnRef"
        className={`flex items-center rounded-full py-[4px] px-[12px] ${iconClasses}`}
        type="button"
        onClick={() => (popoverShow ? closePopover() : openPopover())}
      >
        {icon}

        <div className="text-sm pl-2">
          {name}
        </div>

      </button>

      <div
        id="popoverRef"
        className={
          `${popoverShow ? 'opacity-100 ' : 'opacity-0 pointer-events-none select-none '}
            bg-blue-500 border-0 ml-3 block z-10 text-sm rounded-lg transition-opacity duration-300 ease-in-out absolute shadow-lg max-w-xs text-left break-words`
        }
      >

        <div className="text-lg text-white font-semibold p-2 uppercase rounded-t-lg">
          {name}
        </div>

        <div className="text-gray-200 p-3">
          {description}
        </div>

      </div>

    </div>
  );
};

export default RoleIcon;
