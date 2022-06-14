import { GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'node:querystring';
import Layout from '../../../components/layout';
import { getAllPrefecturesIds } from '../../../libs/prefectures';

interface Params extends ParsedUrlQuery {
  id: string;
}

export default function Prefecture() {
  return (
    <Layout>
      <h1 className='flex justify-center m-2 text-6xl font-semibold tracking-wider leading-tight'></h1>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPrefecturesIds();
  return {
    paths,
    fallback: false,
  };
};

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   const prefecture = await getAllPrefecturesData(params.)
// }
