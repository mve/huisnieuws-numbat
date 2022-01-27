import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/core/Navbar';

const Custom404: React.FC = () => (
  <>
    <Navbar />
    <main className="base-container mt-40 lg:mt-60">
      <h1 className="text-gray-800 text-4xl lg:text-5xl lg:text-center font-bold mb-10">
        Oeps! Er is iets fout gegaan.
      </h1>
      <p className="lg:text-center mb-10 lg:mb-24 lg:text-lg text-gray-700">
        Het lijkt er op dat deze pagina niet bestaat, als je terug wilt naar de homepagina kan je
        <Link href="/">
          <a className="text-blue-500"> hier </a>
        </Link>
        klikken.
      </p>
      <Image src="/page-not-found.svg" priority width="250" height="250" />
    </main>
  </>
);

export default Custom404;
