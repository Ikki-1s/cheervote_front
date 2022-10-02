import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';

import Layout from 'components/layout';
import {
  getPoliticalPartyName,
  getPoliticalPartiesHavingActiveMembersIds,
} from 'libs/politicalParties';
import {
  getPoliticalPartyHcMembersData,
  getPoliticalPartyHrMembersData,
} from 'libs/politicalPartyMembers';

import { PoliticalPartyHrMember, PoliticalPartyHcMember } from 'types';

const PoliticalPartyMember: NextPage<Props> = ({
  politicalPartyName,
  politicalPartyHrMembers,
  politicalPartyHcMembers,
}) => {
  return (
    <Layout>
      <h1 className='flex justify-center m-2 text-6xl font-semibold tracking-wider leading-tight'>
        {politicalPartyName}
      </h1>
      <h2 className='flex justify-center m-2 text-4xl font-semibold tracking-wider leading-tight'>
        衆議院議員
      </h2>
      <ul>
        {politicalPartyHrMembers.length
          ? politicalPartyHrMembers.map((member) => {
              return (
                <li key={member.id.toString()}>
                  {member.politician.last_name_kanji} {member.politician.first_name_kanji}（
                  {member.politician.last_name_kana} {member.politician.first_name_kana}）
                  {member.politician.hr_members[0].elected_system === 1
                    ? `／ ${
                        member.politician.hr_members[0].hr_constituency!.prefecture.prefecture
                      }${member.politician.hr_members[0].hr_constituency!.name}`
                    : `／ ${member.politician.hr_members[0].hr_pr_block!.block_name}ブロック`}
                </li>
              );
            })
          : 'この政党・会派所属の衆議院議員はいません'}
      </ul>
      <h2 className='flex justify-center m-2 text-4xl font-semibold tracking-wider leading-tight'>
        参議院議員
      </h2>
      <ul>
        {politicalPartyHcMembers.length
          ? politicalPartyHcMembers.map((member) => {
              return (
                <li key={member.id.toString()}>
                  {member.politician.last_name_kanji} {member.politician.first_name_kanji}（
                  {member.politician.last_name_kana} {member.politician.first_name_kana}）
                  {member.politician.hc_members[0].elected_system === 1
                    ? `／ ${member.politician.hc_members[0].hc_constituency!.name}`
                    : '／ 全国比例'}
                </li>
              );
            })
          : 'この政党・会派所属の参議院議員はいません'}
      </ul>
    </Layout>
  );
};

export default PoliticalPartyMember;

type Props = {
  politicalPartyName: string;
  politicalPartyHrMembers: PoliticalPartyHrMember[];
  politicalPartyHcMembers: PoliticalPartyHcMember[];
};

interface Params extends ParsedUrlQuery {
  id: string;
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const paths = await getPoliticalPartiesHavingActiveMembersIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
  const politicalPartyName = await getPoliticalPartyName(params!.id);
  const politicalPartyHrMembers = await getPoliticalPartyHrMembersData(params!.id);
  const politicalPartyHcMembers = await getPoliticalPartyHcMembersData(params!.id);
  return {
    props: {
      politicalPartyName,
      politicalPartyHrMembers,
      politicalPartyHcMembers,
    },
  };
};
