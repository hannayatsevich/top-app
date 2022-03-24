import '../styles/globals.css';
import {AppProps} from "next/app";
import Head from "next/head";
import React from "react";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return <>
    <Head >
      <title>Top App</title>
    </Head>
    <Component {...pageProps} />
  </>;
};

export default MyApp;
