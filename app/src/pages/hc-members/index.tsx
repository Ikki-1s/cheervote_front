import { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';

import Layout from '../../components/layout';
import { getAllHcConstituenciesData } from '../../libs/hcConstituencies';

import { HcConstituency } from '../../types/hcConstituency';

const HcMember: NextPage<Props> = ({ allHcConstituenciesData }) => {
  return (
    <Layout>
      <h1 className='flex justify-center m-2 text-6xl font-semibold tracking-wider leading-tight'>
        参議院議員
      </h1>
      <h2 className='flex justify-center m-2 text-4xl font-semibold tracking-wider leading-tight'>
        選挙区
      </h2>
      <ul>
        {allHcConstituenciesData.map((hcConstituencyData) => (
          <li key={hcConstituencyData.id.toString()}>
            <Link href={`/hc-members/hc-constituencies/${hcConstituencyData.id}`}>
              <a>{hcConstituencyData.name}</a>
            </Link>
          </li>
        ))}
      </ul>
      <h2 className='flex justify-center m-2 text-4xl font-semibold tracking-wider leading-tight'>
        全国比例
      </h2>
      <Link href='/hc-members/hc-pr'>全国比例選出議員</Link>
    </Layout>
  );
};

export default HcMember;

type Props = {
  allHcConstituenciesData: HcConstituency[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const allHcConstituenciesData = await getAllHcConstituenciesData();
  return {
    props: { allHcConstituenciesData },
  };
};
