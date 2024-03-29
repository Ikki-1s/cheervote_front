import GrobalStyle from 'styles/globalStyle';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { HistoryContext } from 'stores/HistoryContext';
import { CurrentUserProvider } from 'stores/CurrentUserProvider';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [history, setHistory] = useState([router.asPath, '']);

  useEffect(() => {
    setHistory([router.asPath, history[0]]);
  }, [router.asPath]);

  return (
    <>
      <GrobalStyle />
      <HistoryContext.Provider value={history}>
        <CurrentUserProvider>
          <Component {...pageProps} />
        </CurrentUserProvider>
      </HistoryContext.Provider>
    </>
  );
}

export default MyApp;
