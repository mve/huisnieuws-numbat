import React from 'react';
import Link from 'next/link';

type Props = {
  show: boolean,
  cancel: Function,
  proceedAction: Function,
  roleQueueId: string,
  color: string,
  hover: string,
  bText: string,
  mText: string,
  mTitle: string,
};

const ProceedModal: React.FC<Props> = ({
  show, cancel, proceedAction, roleQueueId, color, hover, bText, mText, mTitle,
}) => (
  <div
    className={`${show ? 'visible' : 'hidden'} fixed z-10 inset-0 overflow-y-auto`}
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div
      className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      />
      <span
        className="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"
      >
        &#8203;
      </span>
      <div
        className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
      >
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                {mTitle}
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Weet je zeker dat je door wilt gaan?
                  <br />
                  {mText}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            onClick={() => { proceedAction(roleQueueId); cancel(false); }}
            type="button"
            className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 ${color} ${hover} focus:ring-gray-300 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm`}
          >
            {bText}
          </button>
          <Link href="/beheren/aanvragen" passHref>
            <div className="flex items-end">
              <a>
                <button
                  onClick={() => cancel(false)}
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md shadow-sm px-4 py-2 bg-gray-200 text-base font-medium text-gray-700  focus:outline-none focus:ring-2 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm focus:ring-gray-300 hover:bg-gray-300"
                >
                  Annuleer
                </button>
              </a>
            </div>
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default ProceedModal;
