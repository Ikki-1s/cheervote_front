import { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';

import Layout from '../../components/layout';
import { getAllHrPrBlocksData } from '../../libs/hrPrBlocks';
import { getAllPrefecturesData } from '../../libs/prefectures';

import { HrPrBlock } from '../../types/hrPrBlock';
import { Prefecture } from '../../types/prefecture';

// const HrMember = ({ allPrefecturesData }: { allPrefecturesData: Prefecture[] }) => {
const HrMember: NextPage<Props> = ({ allPrefecturesData, allHrPrBlocksData }) => {
  return (
    <Layout>
      <h1 className='flex justify-center m-2 text-6xl font-semibold tracking-wider leading-tight'>
        衆議院議員
      </h1>
      <h2 className='flex justify-center m-2 text-4xl font-semibold tracking-wider leading-tight'>
        小選挙区
      </h2>
      <ul>
        {allPrefecturesData.map(({ id, prefecture }) => (
          <li key={id.toString()}>
            <Link href={`/hr-members/prefectures/${id}`}>{prefecture}</Link>
          </li>
        ))}
      </ul>
      <h2 className='flex justify-center m-2 text-4xl font-semibold tracking-wider leading-tight'>
        比例ブロック
      </h2>
      <ul>
        {allHrPrBlocksData.map(({ id, block_name }) => (
          <li key={id.toString()}>
            <Link href={`/hr-members/hr-pr-blocks/${id}`}>
              <a>{block_name}ブロック</a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default HrMember;

type Props = {
  allPrefecturesData: Prefecture[];
  allHrPrBlocksData: HrPrBlock[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const allPrefecturesData = await getAllPrefecturesData();
  const allHrPrBlocksData = await getAllHrPrBlocksData();
  return {
    props: { allPrefecturesData, allHrPrBlocksData },
  };
};
