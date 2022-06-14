import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/layout';

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <h1 className='flex justify-center m-2 text-8xl font-semibold tracking-wider leading-tight'>CHEERVOTE</h1>
    </Layout>
  );
}
