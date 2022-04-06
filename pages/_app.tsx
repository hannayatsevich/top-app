import '../styles/globals.css';
import {AppProps} from "next/app";
import Head from "next/head";
import React from "react";

const MyApp: React.FC<AppProps> = ({ Component, pageProps, router }) => {

  return <>
    <Head >
      <title>Top App</title>
      <meta property={'og:url'} content={process.env.NEXT_PUBLIC_DOMAIN + router.asPath}/>
      <meta property={'og:locale'} content={'ru_RU'}/>
      <meta property={'og:type'} content={'article'}/>
    </Head>
    <Component {...pageProps} />
  </>;
};

export default MyApp;
