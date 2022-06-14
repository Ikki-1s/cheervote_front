import Layout from '../../components/layout';
import { getAllPrefecturesData } from '../../libs/prefectures';
import { GetStaticProps } from 'next';
import Link from 'next/link';

export default function HrMember({
  allPrefecturesData,
}: {
  allPrefecturesData: {
    id: number;
    prefecture: string;
  }[];
}) {
  return (
    <Layout>
      <h1 className='flex justify-center m-2 text-6xl font-semibold tracking-wider leading-tight'>衆議院議員</h1>
      <h2 className='flex justify-center m-2 text-4xl font-semibold tracking-wider leading-tight'>小選挙区</h2>
      <ul>
        {allPrefecturesData.map(({ id, prefecture }) => (
          <li key={id}>
            <Link href={`/hr_members/prefectures/${id}`}>{prefecture}</Link>
          </li>
        ))}
      </ul>
      <h2 className='flex justify-center m-2 text-4xl font-semibold tracking-wider leading-tight'>比例ブロック</h2>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allPrefecturesData = await getAllPrefecturesData();
  return {
    props: { allPrefecturesData },
  };
};
