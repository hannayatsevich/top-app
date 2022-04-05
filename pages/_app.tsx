import '../styles/globals.css';
import {AppProps} from "next/app";
import Head from "next/head";
import React from "react";
import {useRouter} from "next/router";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();

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
