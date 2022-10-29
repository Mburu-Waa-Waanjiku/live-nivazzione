import '../styles/globals.css';
import '../styles/global.css';
import React from 'react';
import { StateContext } from '../utils/StateContext';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { SnackbarProvider } from 'notistack';
import { useEffect } from 'react';
import { StoreProvider } from '../utils/Store';
import { Analytics } from '@vercel/analytics/react';

function MyApp({ Component, pageProps }) {
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
        <PayPalScriptProvider deferLoading={true}>
          <Component {...pageProps} />
          <Analytics />
        </PayPalScriptProvider>
      </StoreProvider>
     </StateContext>
    </SnackbarProvider>
  );
} 

export default MyApp;
