import '../styles/globals.css';
import {AppProps} from "next/app";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return <>
    <Head >
      <title>MyTop App</title>
    </Head>
    <Component {...pageProps} />
  </>;
}

export default MyApp;
