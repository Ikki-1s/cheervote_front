import { NextPage } from 'next';
import useSWRImmutable from 'swr/immutable';
import { getSignedInHomesData } from 'domains/api/signedInHomes';
import BeforeSigninHome from 'components/templates/home/BeforeSigninHome';
import AfterSigninHome from 'components/templates/home/AfterSigninHome';
import { SignedInHome } from 'domains';
import { eliminateToHuKen } from 'utils';

const Home: NextPage = () => {
  const { data: signedInHomesData, isLoading } = useSWRImmutable(
    '/signed_in_homes',
    getSignedInHomesData,
  );

  if (isLoading) return <></>;

  if (!signedInHomesData) return <BeforeSigninHome />;

  const afterSigninHome = adjustAfterSigninHomeData(signedInHomesData);

  return (
    <AfterSigninHome
      userConstituencyView={afterSigninHome.userConstituencyView}
      activeCvTerms={afterSigninHome.activeCvTerms}
      hrAccordionDetail={afterSigninHome.hrAccordionDetail}
      hcAccordionDetail={afterSigninHome.hcAccordionDetail}
    />
  );
};

export default Home;

// AfterSigninHomeコンポーネントに流し込む用に
// getSignedInHomesData()で取得したデータを加工
const adjustAfterSigninHomeData = (data: SignedInHome) => {
  return {
    userConstituencyView: {
      userName: data.user_name,
      myConstituency: {
        hrConstituency:
          eliminateToHuKen(data.hr_constituency.prefecture.prefecture) + data.hr_constituency.name,
        hrPrBlock: data.hr_pr_block.block_name,
        hcConstituency: data.hc_constituency.name,
      },
    },
    activeCvTerms: {
      hrCvTerm: data.current_hr_cv_term,
      hcCvTerm: data.current_hc_cv_term,
    },
    hrAccordionDetail: data.hr_members.map((member) => {
      return {
        voteStatus: member.voted_status,
        cheervoteUrl: `/cheervote?politician=${member.politician.id}`,
        electedArea:
          member.elected_system === 1
            ? eliminateToHuKen(member.hr_constituency!.prefecture.prefecture) +
              member.hr_constituency!.name
            : member.hr_pr_block!.block_name + 'ブロック',
        politicianListData: {
          politicianId: member.politician.id,
          lastNameKanji: member.politician.last_name_kanji,
          firstNameKanji: member.politician.first_name_kanji
            ? member.politician.first_name_kanji
            : '',
          lastNameKana: member.politician.last_name_kana,
          firstNameKana: member.politician.first_name_kana ? member.politician.first_name_kana : '',
          politicianUrl: `/politicians/${member.politician.id}`,
          politicalParty:
            member.politician.political_party_members.slice(-1)[0].political_party.name_kanji,
          politicalPartyUrl: `/political-parties/${
            member.politician.political_party_members.slice(-1)[0].political_party.id
          }`,
        },
      };
    }),
    hcAccordionDetail: data.hc_members.map((member) => {
      return {
        voteStatus: member.voted_status,
        cheervoteUrl: `/cheervote?politician=${member.politician.id}`,
        electedArea: member.hc_constituency.name,
        politicianListData: {
          politicianId: member.politician.id,
          lastNameKanji: member.politician.last_name_kanji,
          firstNameKanji: member.politician.first_name_kanji
            ? member.politician.first_name_kanji
            : '',
          lastNameKana: member.politician.last_name_kana,
          firstNameKana: member.politician.first_name_kana ? member.politician.first_name_kana : '',
          politicianUrl: `/politicians/${member.politician.id}`,
          politicalParty:
            member.politician.political_party_members.slice(-1)[0].political_party.name_kanji,
          politicalPartyUrl: `/political-parties/${
            member.politician.political_party_members.slice(-1)[0].political_party.id
          }`,
        },
      };
    }),
  };
};
