import Document, { Html, Head, Main, NextScript } from 'next/document';

import { siteMeta } from 'domains';
const { siteLang } = siteMeta;

class MyDocument extends Document {
  render() {
    return (
      <Html lang={siteLang}>
        <Head>
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='' />
          <link
            href='https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap'
            rel='stylesheet'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
