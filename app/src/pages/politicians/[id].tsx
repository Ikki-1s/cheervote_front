import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';

import Layout from 'components/layout';
import { getAllPoliticiansIds, getPoliticianWithAssociateData } from 'libs/politicians';
import { PoliticianWithAssociateData } from 'types';

const Politicians: NextPage<Props> = ({ politicianWithAssociateData }) => {
  return (
    <Layout>
      <h1 className='flex justify-center m-2 text-6xl font-semibold tracking-wider leading-tight'>
        {`${politicianWithAssociateData[0].last_name_kanji} ${politicianWithAssociateData[0].first_name_kanji}`}
        {/* 政治家個人ページ */}
      </h1>
      {/* <ul>
        {hrMembersOfPrefectureData.map((hrMember) => {
          return (
            <li key={hrMember.id.toString()}>
              {`${hrMember.hr_constituency.name} : ${hrMember.politician.last_name_kanji} ${hrMember.politician.first_name_kanji} （${hrMember.politician.last_name_kana} ${hrMember.politician.first_name_kana}）`}
              {hrMember.politician.political_party_members.map((politicalPartyMembers) => {
                return `／ ${politicalPartyMembers.political_party.name_kanji}`;
              })}
            </li>
          );
        })}
      </ul> */}
    </Layout>
  );
};

export default Politicians;

type Props = {
  politicianWithAssociateData: PoliticianWithAssociateData[];
};

interface Params extends ParsedUrlQuery {
  id: string;
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const paths = await getAllPoliticiansIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
  const politicianWithAssociateData = await getPoliticianWithAssociateData(params!.id);
  return {
    props: {
      politicianWithAssociateData,
    },
  };
};
