import { NextPage, GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import { CvPageData, getCvPageData, getCvQuestionAndValues, valueof } from 'domains';
import { eliminateToHuKen } from 'utils';
import Template from 'components/templates/cheervote/Cheervote';

type Props = Parameters<typeof Template>[0];

const Cheervote: NextPage<Props> = (props: Props) => {
  return <Template {...props} />;
};

export default Cheervote;

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const { politician } = context.query;
  const cookie = parseCookies(context);

  const cvPageData = await getCvPageData(politician as string, cookie);
  const cvQuestionAndValues = await getCvQuestionAndValues('1');

  const cvPoliticianBasicInfo: valueof<Pick<Props, 'cvPoliticianBasicInfo'>> | null =
    adjustCvPoliticianBasicInfo(cvPageData);

  const cvMyConstituencyMemberBadge: valueof<Pick<Props, 'cvMyConstituencyMemberBadge'>> =
    cvPageData.is_my_constituency_member ? { style: 'isMember' } : { style: 'isNotMember' };

  const activeCvTerm = cvPageData.current_cv_term
    ? {
        id: cvPageData.current_cv_term.id,
        start_date: cvPageData.current_cv_term.start_date,
        end_date: cvPageData.current_cv_term.end_date,
      }
    : null;

  const cvPostForm = {
    cvPageData: cvPageData,
    cvQuestionAndValues: cvQuestionAndValues,
  };

  return {
    props: {
      cvPoliticianBasicInfo,
      cvMyConstituencyMemberBadge,
      activeCvTerm,
      cvPostForm,
    },
  };
};

// cvPoliticianBasicInfo用データ加工
const adjustCvPoliticianBasicInfo = (cvPageData: CvPageData) => {
  let cvPoliticianBasicInfo;
  if (cvPageData.is_active_house_member) {
    if (cvPageData.hr_member) {
      cvPoliticianBasicInfo = {
        politician: {
          id: cvPageData.hr_member.politician.id,
          lastNameKanji: cvPageData.hr_member.politician.last_name_kanji,
          firstNameKanji: cvPageData.hr_member.politician.first_name_kanji
            ? cvPageData.hr_member.politician.first_name_kanji
            : '',
          image: cvPageData.hr_member.politician.image ? cvPageData.hr_member.politician.image : '',
        },
        politicalParty: {
          id: cvPageData.hr_member.politician.political_party_members.length
            ? cvPageData.hr_member.politician.political_party_members.slice(-1)[0].political_party
                .id
            : NaN,
          nameKanji: cvPageData.hr_member.politician.political_party_members.length
            ? cvPageData.hr_member.politician.political_party_members.slice(-1)[0].political_party
                .name_kanji
            : '',
        },
        activeElectionData: {
          whichHouse: 'hr' as 'hr',
          electedArea:
            cvPageData.hr_member.elected_system === 1
              ? cvPageData.hr_member.hr_constituency
                ? eliminateToHuKen(cvPageData.hr_member.hr_constituency.prefecture.prefecture) +
                  cvPageData.hr_member.hr_constituency.name
                : ''
              : cvPageData.hr_member.elected_system === 2
              ? cvPageData.hr_member.hr_pr_block
                ? `比例 ${cvPageData.hr_member.hr_pr_block.block_name}ブロック`
                : ''
              : '',
          dualCandidacyArea:
            cvPageData.hr_member.elected_system === 2
              ? cvPageData.hr_member.hr_constituency
                ? eliminateToHuKen(cvPageData.hr_member.hr_constituency.prefecture.prefecture) +
                  cvPageData.hr_member.hr_constituency.name
                : ''
              : '',
        },
      };
    } else if (cvPageData.hc_member) {
      cvPoliticianBasicInfo = {
        politician: {
          id: cvPageData.hc_member.politician.id,
          lastNameKanji: cvPageData.hc_member.politician.last_name_kanji,
          firstNameKanji: cvPageData.hc_member.politician.first_name_kanji
            ? cvPageData.hc_member.politician.first_name_kanji
            : '',
          image: cvPageData.hc_member.politician.image ? cvPageData.hc_member.politician.image : '',
        },
        politicalParty: {
          id: cvPageData.hc_member.politician.political_party_members.length
            ? cvPageData.hc_member.politician.political_party_members.slice(-1)[0].political_party
                .id
            : NaN,
          nameKanji: cvPageData.hc_member.politician.political_party_members.length
            ? cvPageData.hc_member.politician.political_party_members.slice(-1)[0].political_party
                .name_kanji
            : '',
        },
        activeElectionData: {
          whichHouse: 'hc' as 'hc',
          electedArea:
            cvPageData.hc_member.elected_system === 1
              ? cvPageData.hc_member.hc_constituency
                ? cvPageData.hc_member.hc_constituency.name
                : ''
              : cvPageData.hc_member.elected_system === 2
              ? '全国比例'
              : '',
        },
      };
    } else {
      cvPoliticianBasicInfo = null;
    }
  } else {
    cvPoliticianBasicInfo = null;
  }
  return cvPoliticianBasicInfo;
};
