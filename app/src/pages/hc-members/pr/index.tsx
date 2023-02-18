import { GetStaticProps, NextPage } from 'next';
import Template from 'components/templates/hc-members/pr/HcMembersOfPr';
import { getHcMembersOfPr, valueof } from 'domains';

type Props = Parameters<typeof Template>[0];

const HcMembersOfPr: NextPage<Props> = ({ hcMembersTable }) => {
  return <Template hcMembersTable={hcMembersTable} />;
};

export default HcMembersOfPr;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const hcMembersOfPr = await getHcMembersOfPr();

  const hcMembersTable: valueof<Pick<Props, 'hcMembersTable'>> = hcMembersOfPr.map((data) => {
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
  });
  return {
    props: {
      hcMembersTable,
    },
  };
};
