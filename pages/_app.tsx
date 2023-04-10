import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { IBM_Plex_Mono } from 'next/font/google';
import Head from 'next/head';
import styles from '@/styles/App.module.css'
const font=IBM_Plex_Mono({weight:["400","700"],subsets:["latin"]})
export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={font.className}>
      <Head>
      {/* <meta name="viewport" content="width=device-width, initial-scale=1" />
      <style>{`
            @media (max-width: 768px) {
              meta[name="viewport"] {
                width: device-width;
                initial-scale: 1.0;
                user-scalable: no;
              }
            }
          `}</style> */}
        <title>Hawaii Tour app</title>
      </Head>
      <div className={styles.pageContainer}>
      <Component {...pageProps} />
      </div>
    </div>
  );
}
