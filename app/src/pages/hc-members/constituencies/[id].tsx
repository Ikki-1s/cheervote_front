import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import Template from 'components/templates/hc-members/constituencies/HcMembersOfConstituency';
import {
  getAllHcConstituenciesIds,
  getHcConstituency,
  getHcMembersOfConstituency,
  valueof,
} from 'domains';
import Meta from 'components/organisms/Meta';

interface Params extends ParsedUrlQuery {
  id: string;
}

type Props = Parameters<typeof Template>[0];

const HcMembersOfConstituency: NextPage<Props> = ({ hcConstituency, hcMembersTable }) => {
  return (
    <>
      <Meta pageTitle='参議院選挙区選出議員' pageDesc='参議院の選挙区から選出された議員です。' />
      <Template hcConstituency={hcConstituency} hcMembersTable={hcMembersTable} />
    </>
  );
};

export default HcMembersOfConstituency;

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const paths = await getAllHcConstituenciesIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
  const hcConstituency = await getHcConstituency(params!.id);
  const hcMembersOfConstituency = await getHcMembersOfConstituency(params!.id);

  const hcMembersTable: valueof<Pick<Props, 'hcMembersTable'>> = hcMembersOfConstituency.map(
    (data) => {
      return {
        hcElectionTime: data.hc_election_time,
        politicianListData: {
          imageSrc: data.politician.image ? data.politician.image : '',
          politicianId: data.politician.id,
          lastNameKanji: data.politician.last_name_kanji,
          firstNameKanji: data.politician.first_name_kanji ? data.politician.first_name_kanji : '',
          lastNameKana: data.politician.last_name_kana,
          firstNameKana: data.politician.first_name_kana ? data.politician.first_name_kana : '',
          politicianUrl: `/politicians/${data.politician.id}`,
          politicalParty:
            data.politician.political_party_members.slice(-1)[0].political_party.name_kanji,
          politicalPartyUrl: `/political-parties/${
            data.politician.political_party_members.slice(-1)[0].political_party.id
          }`,
        },
      };
    },
  );
  return {
    props: {
      hcConstituency,
      hcMembersTable,
    },
    revalidate: 5,
  };
};
