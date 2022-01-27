import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/client';
import Navbar from '../components/core/Navbar';
import { getZipcode, zipcodeIsValid } from '../support/zipcode';

const Home: React.FC = () => {
  const router = useRouter();
  const [postcode, setPostcode] = useState('');
  const [session] = useSession();

  const handleSubmit = (): void => {
    if (zipcodeIsValid(postcode)) {
      router.push(`/artikelen?postcode=${postcode}`);
    }
  };

  const updatePostcode = (code: string): void => {
    setPostcode(code);
    window.localStorage.setItem('postcode', code);
  };

  useEffect(() => setPostcode(getZipcode()), [postcode]);

  return (
    <div className="window__screen">
      <Head>
        <title>Huisnieuws</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main
        className="mt-20 flex px-2 flex-col items-center justify-center w-full flex-1 lg:px-20 text-center min-w-full"
      >

        <h1 className="text-4xl font-bold text-gray-800">
          Welkom bij
          <span className="text-blue-600">
            &nbsp;Huisnieuws
          </span>
        </h1>

        <p className="mt-3 text-xl text-gray-800">
          Met Huisnieuws kan je nieuws bekijken op basis van je postcode
        </p>
        <div className="w-full">
          <div className="flex justify-center mb-4 mt-3">

            <input
              value={postcode || ''}
              onChange={(e) => updatePostcode(e.target.value)}
              className="shadow appearance-none border rounded px-4 text-gray-700 leading-tight focus:outline-none rounded-r-none border-r-0"
              id="postcode"
              type="text"
              placeholder="Postcode"
            />

            <button
              disabled={!zipcodeIsValid(postcode)}
              onClick={() => handleSubmit()}
              id="submit-zipcode"
              className={`${!zipcodeIsValid(postcode) ? 'disabled:bg-gray-500 disabled:cursor-not-allowed ' : ''}shadow bg-blue-600 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-[11px] px-5 rounded rounded-l-none`}
              type="button"
            >
              Zoek
            </button>
          </div>
        </div>

        <h2 className="mt-1 text-xl">
          Wil je nieuws plaatsen op Huisnieuws?
        </h2>

        <div className="md:w-1/3 mt-2">
          {
            session
              ? (
                <Link href="/profiel" passHref>
                  <button type="button" className="text-blue-600 underline hover:text-blue-700">
                    Bezoek dan deze pagina!
                  </button>
                </Link>
              )
              : (
                <button type="button" onClick={() => signIn()}>
                  <span className="text-blue-600 underline hover:text-blue-700">
                    Meld je dan aan!
                  </span>
                </button>
              )
          }
        </div>
      </main>
    </div>
  );
};
export default Home;
