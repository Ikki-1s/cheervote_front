import GrobalStyle from 'styles/globalStyle';
import type { AppProps } from 'next/app';
import Layout from 'components/templates/common/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GrobalStyle />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
