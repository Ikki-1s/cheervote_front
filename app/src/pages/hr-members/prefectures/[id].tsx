import {
  GetStaticProps,
  GetStaticPaths,
  NextPage,
  InferGetStaticPropsType,
  GetStaticPropsContext,
} from 'next';
import { ParsedUrlQuery } from 'querystring';
import Layout from '../../../components/layout';
import { getHrMembersOfPrefectureData } from '../../../libs/hrMembers';
import { getAllPrefecturesIds, getPrefectureName } from '../../../libs/prefectures';
import { HrMemberOfPrefecture } from '../../../types/hrMember';

const HrMemberOfPrefecture: NextPage<Props> = ({ prefectureName, hrMembersOfPrefectureData }) => {
  return (
    <Layout>
      <h1 className='flex justify-center m-2 text-6xl font-semibold tracking-wider leading-tight'>
        {prefectureName}
      </h1>
      <ul>
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
      </ul>
    </Layout>
  );
};

export default HrMemberOfPrefecture;

type Props = {
  prefectureName: string;
  hrMembersOfPrefectureData: HrMemberOfPrefecture[];
};
// type Props = InferGetStaticPropsType<typeof getStaticProps>

interface Params extends ParsedUrlQuery {
  id: string;
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const paths = await getAllPrefecturesIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
  const prefectureName = await getPrefectureName(params!.id);
  const hrMembersOfPrefectureData = await getHrMembersOfPrefectureData(params!.id);
  return {
    props: {
      prefectureName,
      hrMembersOfPrefectureData,
    },
  };
};
// export const getStaticProps = async (context: GetStaticPropsContext<{ id: string }>) => {
//   const prefectureName = await getPrefectureName(context.params.id);
//   const hrMembersOfPrefectureData = await getHrMembersOfPrefectureData(context.params.id);
//   return {
//     props: {
//       prefectureName,
//       hrMembersOfPrefectureData,
//     },
//   };
// };
