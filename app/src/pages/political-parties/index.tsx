import { GetStaticProps, NextPage } from 'next';
import Template from 'components/templates/political-parties/PoliticalParties';
import { getPoliticalPartiesHavingActiveMembers, valueof } from 'domains';
import Meta from 'components/organisms/Meta';

type Props = Parameters<typeof Template>[0];

const PoliticalParties: NextPage<Props> = ({ politicalPartiesTable }) => {
  return (
    <>
      <Meta
        pageTitle='政党別国会議員'
        pageDesc='政党別国会議員のページです。各政党のリンクからその政党の現役の国会議員の一覧を表示します。'
      />
      <Template politicalPartiesTable={politicalPartiesTable} />
    </>
  );
};

export default PoliticalParties;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const politicalPartiesHavingActiveMembers = await getPoliticalPartiesHavingActiveMembers();

  const politicalPartiesTable: valueof<Pick<Props, 'politicalPartiesTable'>> =
    politicalPartiesHavingActiveMembers.map((data) => {
      return {
        politicalPartyId: data.id,
        politicalPartyName: data.name_kanji,
        numberOfHrMembers: data.hr_count,
        numberOfHcMembers: data.hc_count,
        url: `/political-parties/${data.id}`,
      };
    });
  return {
    props: {
      politicalPartiesTable,
    },
    revalidate: 5,
  };
};
