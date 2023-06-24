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
          <link
            href='https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,500;0,600;0,700;1,500;1,600;1,700&family=Noto+Sans+JP:wght@400;500;700&display=swap'
            rel='stylesheet'
          ></link>
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
