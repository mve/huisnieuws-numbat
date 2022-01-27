import { NextRouter, useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/client';
import { getZipcode, zipcodeIsValid } from '../../support/zipcode';
import Auth from './Auth';
import DropdownMenu from '../DropdownMenu';

const Navbar = () => {
  const router: NextRouter = useRouter();
  const [zipcode, setZipcode] = useState<string>('');
  const [session] = useSession();

  useEffect(() => setZipcode(getZipcode()), []);

  return (
    <nav className="p-5 bg-blue-500 dark:bg-gray-500 w-full fixed top-0 z-30">
      <div className="lg:container lg:mx-auto flex flex-row items-start sm:flex-row sm:items-center justify-between">
        <div className="flex items-center">
          <Link href="/">
            <a
              className="grid place-items-center cursor-pointer lg:text-3xl md:text-2xl md:pb-0 text-xl font-bold text-white"
            >
              <div className="flex items-center text-2xl">
                <div>
                  🏡
                </div>
                <div className="hidden sm:block pl-2">
                  Huisnieuws
                </div>
              </div>
            </a>
          </Link>
        </div>
        <div className="flex items-center">
          {router.asPath !== '/' && (
            <ChangePostcodeBox
              zipcode={zipcode}
              onChange={(value: string) => setZipcode(value)}
            />
          )}
          <DropdownMenu />
          <Link href="/artikelen">
            <a id="article-btn" className="mr-4 hidden sm:inline-flex transition-all disabled:opacity-50 disabled:cursor-not-allowed max-w-[12rem] justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-black bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Artikelen
            </a>
          </Link>
          {session && (
            <Link href="/profiel">
              <a id="profile-btn" className="hidden sm:block text-white hover:underline mr-5">
                Profiel
              </a>
            </Link>
          )}
          <div className="hidden sm:block">
            <Auth />
          </div>
        </div>
      </div>
    </nav>
  );
};

type ZipcodeProps = {
  zipcode: string,
  onChange: Function,
};

const ChangePostcodeBox: React.FC<ZipcodeProps> = ({ zipcode, onChange }) => {
  const router: NextRouter = useRouter();

  const handleChangeZipcode = (e) => {
    const value = e.target.value || '';
    onChange(value);
    window.localStorage.setItem('postcode', value);
  };

  const handleSaveZipcode = () => (
    ['', null].includes(zipcode)
      ? router.push('/artikelen')
      : router.push(`/artikelen?postcode=${zipcode}`)
  );

  return (
    <form
      className="mr-14 sm:mr-6 flex flex-initial px-2 rounded border dark:bg-gray-800 bg-white"
      onSubmit={(e) => {
        e.preventDefault();
        handleSaveZipcode();
      }}
    >
      <input
        placeholder="1234AB"
        value={zipcode ?? ''}
        onChange={handleChangeZipcode}
        type="text"
        className="p-2 w-28 text-gray-700 focus:outline-none border-none focus:shadow-none"
      />
      <button
        type="submit"
        className="flex place-items-center"
        disabled={!zipcodeIsValid(zipcode)}
      >
        <Image
          className="cursor-pointer"
          src="/icons/search.svg"
          alt="icon"
          width="24px"
          height="24px"
        />
      </button>
    </form>
  );
};

export default Navbar;
