import '../styles/globals.css';
import '../styles/global.css';
import '../styles/global3.css';
import '../styles/Opcss.css'
import React from 'react';
import { StateContext } from '../utils/StateContext';
import { SnackbarProvider } from 'notistack';
import { useEffect } from 'react';
import Script from "next/script";
import { Analytics } from '@vercel/analytics/react';
import { StoreProvider } from '../utils/Store';
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false


function MyApp({ Component, pageProps }) {

  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return (
    <SnackbarProvider anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
     <StateContext>
      <StoreProvider>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <Component {...pageProps} />
            <Script
              strategy="lazyOnload"
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
            />
            <Script id="google-analytics" strategy="lazyOnload">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
            <Analytics />
          </Hydrate>
        </QueryClientProvider>
      </StoreProvider>
     </StateContext>
    </SnackbarProvider>
  );
} 

export default MyApp;
