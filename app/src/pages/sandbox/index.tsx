import { NextPage } from 'next';
import Head from 'next/head';
import Layout2, { siteTitle } from 'components/layout2';

const Home: NextPage = () => {
  return (
    <Layout2>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <h1 className='flex justify-center m-2 text-8xl font-semibold tracking-wider leading-tight'>
        CHEERVOTE
      </h1>
    </Layout2>
  );
};

export default Home;
