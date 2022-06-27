import { NextPage } from 'next';
import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';

const Home: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <h1 className='flex justify-center m-2 text-8xl font-semibold tracking-wider leading-tight'>CHEERVOTE</h1>
    </Layout>
  );
};

export default Home;
