import React from 'react';
import type { AppProps } from 'next/app';
import '../styles/index.css';
import { Provider } from 'next-auth/client';
import Head from 'next/head';

const App = ({ Component, pageProps }: AppProps) => (
  <Provider session={pageProps.session}>
    <Head>
      <title>Huisnieuws</title>
    </Head>
    <Component {...pageProps} />
  </Provider>
);

export default App;
