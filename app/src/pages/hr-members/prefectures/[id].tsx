import { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import {
  getAllPrefecturesIds,
  getPrefectureName,
  getHrMembersOfPrefecture,
  valueof,
} from 'domains';
import Template from 'components/templates/hr-members/prefectures/HrMembersOfPrefecture';
import Meta from 'components/organisms/Meta';

interface Params extends ParsedUrlQuery {
  id: string;
}

type Props = Parameters<typeof Template>[0];

const HrMembersOfPrefecture: NextPage<Props> = ({ prefectureName, hrMembersOfPrefectureTable }) => {
  return (
    <>
      <Meta
        pageTitle='衆議院小選挙区選出議員(都道府県別)'
        pageDesc='各都道府県の衆議院小選挙区から選出された議員です。'
      />
      <Template
        prefectureName={prefectureName}
        hrMembersOfPrefectureTable={hrMembersOfPrefectureTable}
      />
    </>
  );
};

export default HrMembersOfPrefecture;

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const paths = await getAllPrefecturesIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
  const prefectureName = await getPrefectureName(params!.id);
  const hrMembersOfPrefecture = await getHrMembersOfPrefecture(params!.id);

  const hrMembersOfPrefectureTable: valueof<Pick<Props, 'hrMembersOfPrefectureTable'>> =
    hrMembersOfPrefecture.map((data) => {
      return {
        hrConstituency: {
          id: data.hr_constituency.id,
          name: data.hr_constituency.name,
        },
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
      prefectureName,
      hrMembersOfPrefectureTable,
    },
    revalidate: 5,
  };
};
