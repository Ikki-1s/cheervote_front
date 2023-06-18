import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { getAllHrPrBlocksIds, getHrPrBlock, getHrMembersOfPrBlock, valueof } from 'domains';
import Template from 'components/templates/hr-members/pr-blocks/HrMembersOfPrBlock';
import Meta from 'components/organisms/Meta';

interface Params extends ParsedUrlQuery {
  id: string;
}

type Props = Parameters<typeof Template>[0];

const HrMemberOfPrBlock: NextPage<Props> = ({ hrPrBlock, hrMembersOfPrBlockTable }) => {
  return (
    <>
      <Meta pageTitle='衆議院比例代表選出議員' pageDesc='衆議院の比例代表で選出された議員です。' />
      <Template hrPrBlock={hrPrBlock} hrMembersOfPrBlockTable={hrMembersOfPrBlockTable} />
    </>
  );
};

export default HrMemberOfPrBlock;

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const paths = await getAllHrPrBlocksIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
  const hrPrBlock = await getHrPrBlock(params!.id);
  const hrMembersOfPrBlock = await getHrMembersOfPrBlock(params!.id);

  const hrMembersOfPrBlockTable: valueof<Pick<Props, 'hrMembersOfPrBlockTable'>> =
    hrMembersOfPrBlock.map((data) => {
      return {
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
      hrPrBlock,
      hrMembersOfPrBlockTable,
    },
  };
};
