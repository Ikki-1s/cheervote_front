import GrobalStyle from 'styles/globalStyle';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GrobalStyle />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
