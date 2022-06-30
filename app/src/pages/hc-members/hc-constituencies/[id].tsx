import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';

import Layout from 'components/layout';
import { getHcConstituencyName, getAllHcConstituenciesIds } from 'libs/hcConstituencies';
import { getHcMembersOfHcConstituencyData } from 'libs/hcMembers';

import { HcMemberOfHcConstituency } from 'types/hcMember';

const HcMemberOfHcConstituency: NextPage<Props> = ({
  hcConstituencyName,
  hcMembersOfHcConstituencyData,
}) => {
  return (
    <Layout>
      <h1 className='flex justify-center m-2 text-6xl font-semibold tracking-wider leading-tight'>
        {hcConstituencyName}
      </h1>
      <ul>
        {hcMembersOfHcConstituencyData.map((hcMember) => {
          return (
            <li key={hcMember.id.toString()}>
              {`${hcMember.politician.last_name_kanji} ${hcMember.politician.first_name_kanji} （${hcMember.politician.last_name_kana} ${hcMember.politician.first_name_kana}）`}
              {hcMember.politician.political_party_members.map((politicalPartyMembers) => {
                return `／ ${politicalPartyMembers.political_party.name_kanji}`;
              })}
              ／任期満了：
              {hcMember.hc_election_time.expiration_date.replace(
                /([0-9]+)-([0-9]+)-([0-9]+)/,
                '$1年$2月$3日',
              )}
            </li>
          );
        })}
      </ul>
    </Layout>
  );
};

export default HcMemberOfHcConstituency;

type Props = {
  hcConstituencyName: string;
  hcMembersOfHcConstituencyData: HcMemberOfHcConstituency[];
};

interface Params extends ParsedUrlQuery {
  id: string;
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const paths = await getAllHcConstituenciesIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
  const hcConstituencyName = await getHcConstituencyName(params!.id);
  const hcMembersOfHcConstituencyData = await getHcMembersOfHcConstituencyData(params!.id);
  return {
    props: {
      hcConstituencyName,
      hcMembersOfHcConstituencyData,
    },
  };
};
