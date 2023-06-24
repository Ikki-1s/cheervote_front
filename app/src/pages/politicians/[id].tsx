import { GetServerSideProps, NextPage } from 'next';
import Template from 'components/templates/politicians/Politician';
import {
  getPoliticianWithAssociateData,
  HcMemberWithAssociateData,
  HrMemberWithAssociateData,
  PoliticianWithAssociateData,
  valueof,
} from 'domains';
import { eliminateToHuKen } from 'utils';
import Meta from 'components/organisms/Meta';

type Props = Parameters<typeof Template>[0];

const Politician: NextPage<Props> = ({ politicianBasicInfoTable }: Props) => {
  const pageTitle =
    politicianBasicInfoTable?.politician.lastNameKanji &&
    politicianBasicInfoTable.politician.firstNameKanji
      ? `${politicianBasicInfoTable.politician.lastNameKanji}${politicianBasicInfoTable.politician.firstNameKanji}`
      : '指定の政治家が見つかりません';
  const pageDesc =
    politicianBasicInfoTable?.politician.lastNameKanji &&
    politicianBasicInfoTable.politician.firstNameKanji
      ? `${politicianBasicInfoTable.politician.lastNameKanji}${politicianBasicInfoTable.politician.firstNameKanji}議員の個人ページです`
      : '指定の政治家がいないか、現役議員ではないため、表示できません';
  return (
    <>
      <Meta pageTitle={pageTitle} pageDesc={pageDesc} />
      <Template politicianBasicInfoTable={politicianBasicInfoTable} />
    </>
  );
};

export default Politician;

type PathParams = {
  id: string;
};

// interface Params extends ParsedUrlQuery {
//   id: string;
// }

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const { id } = context.params as PathParams;

  const politicianWithAssociateData = await getPoliticianWithAssociateData(id);
  const politicianBasicInfoTable = adjustPoliticianBasicInfoTable(politicianWithAssociateData[0]);

  return {
    props: {
      politicianBasicInfoTable,
    },
  };
};

// PoliticianBasicInfoTableのPropsの形に合わせてデータ整形
const adjustPoliticianBasicInfoTable = (
  politician: PoliticianWithAssociateData,
): valueof<Pick<Props, 'politicianBasicInfoTable'>> | null => {
  // 衆議院議員情報、参議院議員情報の内、最新の情報を抽出
  const latestHrMemberData = politician.hr_members?.slice(-1)[0];
  const latestHcMemberData = politician.hc_members?.slice(-1)[0];
  const latestHouseData = determineWhichHouseMember(latestHrMemberData, latestHcMemberData);

  if (!latestHouseData) {
    return null;
  } else {
    const activeElectionData = adjustActiveElectionData(latestHouseData);

    return {
      politician: {
        lastNameKanji: politician.last_name_kanji,
        ...(politician.first_name_kanji && { firstNameKanji: politician.first_name_kanji }),
        lastNameKana: politician.last_name_kana,
        ...(politician.first_name_kana && { firstNameKana: politician.first_name_kana }),
        ...(politician.image && { imageSrc: politician.image }),
        ...(politician.birthday && { birthday: politician.birthday }),
        ...(politician.career && { career: politician.career }),
        ...(politician.website && { website: politician.website }),
        ...(politician.twitter && { twitter: politician.twitter }),
        ...(politician.youtube && { youtube: politician.youtube }),
        ...(politician.facebook && { facebook: politician.facebook }),
        ...(politician.instagram && { instagram: politician.instagram }),
        ...(politician.line && { line: politician.line }),
      },
      politicalParty: {
        name: politician.political_party_members.slice(-1)[0].political_party.name_kanji,
      },
      activeElectionData: activeElectionData,
    };
  }
};

type LatestHouseData =
  | {
      readonly whichHouse: 'hr';
      houseMemberData: HrMemberWithAssociateData;
    }
  | {
      readonly whichHouse: 'hc';
      houseMemberData: HcMemberWithAssociateData;
    }
  | null;

// 衆参どちらの現役議員かを判定し、現役である方のデータを返す。
const determineWhichHouseMember = (
  latestHrMemberData: HrMemberWithAssociateData | undefined,
  latestHcMemberData: HcMemberWithAssociateData | undefined,
): LatestHouseData => {
  // 衆議院議員情報あり、参議院議員情報あり
  if (latestHrMemberData && latestHcMemberData) {
    // 選挙日比較
    if (
      new Date(latestHrMemberData!.hr_election_time.election_date) >
      new Date(latestHcMemberData!.hc_election_time.election_date)
    ) {
      // 衆議院の方が最新の場合
      return {
        whichHouse: 'hr',
        houseMemberData: latestHrMemberData,
      };
    } else {
      // 参議院の方が最新の場合
      return {
        whichHouse: 'hc',
        houseMemberData: latestHcMemberData,
      };
    }

    // 衆議院議員情報あり、参議院議員情報なし
  } else if (latestHrMemberData && !latestHcMemberData) {
    // 衆議院議員.途中任期終了日チェック
    if (!latestHrMemberData.mid_term_end_date) {
      return {
        whichHouse: 'hr',
        houseMemberData: latestHrMemberData,
      };
    } else {
      return null;
    }
    // 衆議院議員情報なし、参議院議員情報あり
  } else if (!latestHrMemberData && latestHcMemberData) {
    // 参議院議員.途中任期終了日チェック
    if (!latestHcMemberData.mid_term_end_date) {
      return {
        whichHouse: 'hc',
        houseMemberData: latestHcMemberData,
      };
    } else {
      return null;
    }
    // 衆議院議員情報なし、参議院議員情報なし（不正パターン）
  } else {
    return null;
  }
};

// 現役議員情報から選出情報を抽出・加工する。
const adjustActiveElectionData = (
  latestHouseData: Exclude<ReturnType<typeof determineWhichHouseMember>, null>,
) => {
  // 衆議院議員
  if (latestHouseData.whichHouse === 'hr') {
    // 衆議院小選挙区選出議員
    if (latestHouseData.houseMemberData.elected_system === 1) {
      return {
        whichHouse: latestHouseData.whichHouse,
        electedArea:
          eliminateToHuKen(latestHouseData.houseMemberData.hr_constituency!.prefecture.prefecture) +
          latestHouseData.houseMemberData.hr_constituency!.name,
      };
      // 衆議院比例代表ブロック選出議員
    } else {
      // 小選挙区重複立候補者
      if (latestHouseData.houseMemberData.hr_constituency) {
        return {
          whichHouse: latestHouseData.whichHouse,
          electedArea: latestHouseData.houseMemberData.hr_pr_block!.block_name + 'ブロック',
          dualCandidacyArea:
            eliminateToHuKen(
              latestHouseData.houseMemberData.hr_constituency!.prefecture.prefecture,
            ) + latestHouseData.houseMemberData.hr_constituency!.name,
        };
        // 比例単独候補
      } else {
        return {
          whichHouse: latestHouseData.whichHouse,
          electedArea: latestHouseData.houseMemberData.hr_pr_block!.block_name + 'ブロック',
        };
      }
    }
    // 参議院議員
  } else {
    // 選挙区選出議員
    if (latestHouseData.houseMemberData.elected_system === 1) {
      return {
        whichHouse: latestHouseData.whichHouse,
        electedArea: latestHouseData.houseMemberData.hc_constituency!.name,
      };
      // 全国比例選出議員
    } else {
      return {
        whichHouse: latestHouseData.whichHouse,
        electedArea: '全国比例',
      };
    }
  }
};
