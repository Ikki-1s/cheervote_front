import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';

import Layout from 'components/layout';
import { getHrMembersOfHrPrBlockData } from 'libs/hrMembers';
import { getAllHrPrBlocksIds, getHrPrBlockName } from 'libs/hrPrBlocks';

import { HrMemberOfHrPrBlock } from 'types';
import Link from 'next/link';

const HrMemberOfHrPrBlock: NextPage<Props> = ({ hrPrBlockName, hrMembersOfHrPrBlockData }) => {
  return (
    <Layout>
      <h1 className='flex justify-center m-2 text-6xl font-semibold tracking-wider leading-tight'>
        {hrPrBlockName}ブロック
      </h1>
      <ul>
        {hrMembersOfHrPrBlockData.map((hrMember) => {
          return (
            <li key={hrMember.id.toString()}>
              <Link href={`/politicians/${hrMember.politician.id}`}>
                <a className='text-indigo-600 hover:text-indigo-600 hover:underline'>{`${hrMember.politician.last_name_kanji} ${hrMember.politician.first_name_kanji} （${hrMember.politician.last_name_kana} ${hrMember.politician.first_name_kana}）`}</a>
              </Link>
              {hrMember.politician.political_party_members.map((politicalPartyMembers) => {
                return `／ ${politicalPartyMembers.political_party.name_kanji}`;
              })}
            </li>
          );
        })}
      </ul>
    </Layout>
  );
};

export default HrMemberOfHrPrBlock;

type Props = {
  hrPrBlockName: string;
  hrMembersOfHrPrBlockData: HrMemberOfHrPrBlock[];
};

interface Params extends ParsedUrlQuery {
  id: string;
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const paths = await getAllHrPrBlocksIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
  const hrPrBlockName = await getHrPrBlockName(params!.id);
  const hrMembersOfHrPrBlockData = await getHrMembersOfHrPrBlockData(params!.id);
  return {
    props: {
      hrPrBlockName,
      hrMembersOfHrPrBlockData,
    },
  };
};
