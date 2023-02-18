import {
  isPropertyAccessible,
  CvTerm,
  isCvTerm,
  HcConstituency,
  isHcConstituency,
  HcElectionTime,
  isHcElectionTime,
  HcMember,
  isHcMember,
  HrConstituencyWithPref,
  isHrConstituencyWithPref,
  HrElectionTime,
  isHrElectionTime,
  HrMember,
  isHrMember,
  HrPrBlock,
  isHrPrBlock,
  isPoliticalPartyMember,
  PoliticalPartyMember,
  isPolitician,
  Politician,
  isPrefecture,
} from 'domains';

// 支持投票ページ表示用データ
export type CvPageData = {
  is_login: boolean;
  is_active_house_member: boolean;
  hc_member?: HcMember & {
    hc_election_time: HcElectionTime;
    hc_constituency?: HcConstituency;
    politician: Politician & {
      political_party_members: PoliticalPartyMember[];
    };
  };
  hr_member?: HrMember & {
    hr_election_time: HrElectionTime;
    hr_constituency?: HrConstituencyWithPref;
    hr_pr_block?: HrPrBlock;
    politician: Politician & {
      political_party_members: PoliticalPartyMember[];
    };
  };
  current_cv_term?: CvTerm | null;
  is_my_constituency_member?: boolean;
  is_login_user_possible_to_cv_on_term?: boolean | null;
};

export const isCvPageData = (arg: unknown): arg is CvPageData => {
  if (!isPropertyAccessible(arg)) return false;

  // is_active_house_member = trueの場合
  if (arg.is_active_house_member === true) {
    // 現役衆議院議員の場合
    if (isPropertyAccessible(arg.hr_member)) {
      // 衆議院選挙回のチェック
      if (isPropertyAccessible(arg.hr_member.hr_election_time)) {
        if (!isHrElectionTime(arg.hr_member.hr_election_time)) return false;
      }

      // 小選挙区のチェック
      if (
        isPropertyAccessible(arg.hr_member.hr_constituency) &&
        isPropertyAccessible(arg.hr_member.hr_constituency.prefecture)
      ) {
        if (
          !isPrefecture(arg.hr_member.hr_constituency.prefecture) ||
          !isHrConstituencyWithPref(arg.hr_member.hr_constituency)
        )
          return false;
      }

      // 比例代表ブロックのチェック
      if (isPropertyAccessible(arg.hr_member.hr_pr_block)) {
        if (!isHrPrBlock(arg.hr_member.hr_pr_block)) return false;
      }

      // 政治家のチェック
      if (
        isPropertyAccessible(arg.hr_member.politician) &&
        isPropertyAccessible(arg.hr_member.politician.political_party_members)
      ) {
        // 政治家所属政党（政党含むのチェック）
        if (!Array.isArray(arg.hr_member.politician.political_party_members)) return false;
        if (
          arg.hr_member.politician.political_party_members.some((v) => !isPoliticalPartyMember(v))
        )
          return false;

        // 政治家部分のチェック
        if (!isPolitician(arg.hr_member.politician)) return false;
      }

      // 共通部分のチェック
      if (!isHrMember(arg.hr_member)) return false;
    }

    // 現役参議院議員の場合
    if (isPropertyAccessible(arg.hc_member)) {
      // 参議院選挙回のチェック
      if (isPropertyAccessible(arg.hc_member.hc_election_time)) {
        if (!isHcElectionTime(arg.hc_member.hc_election_time)) return false;
      }

      // 選挙区のチェック
      if (isPropertyAccessible(arg.hc_member.hc_constituency)) {
        if (!isHcConstituency(arg.hc_member.hc_constituency)) return false;
      }

      // 政治家のチェック
      if (
        isPropertyAccessible(arg.hc_member.politician) &&
        isPropertyAccessible(arg.hc_member.politician.political_party_members)
      ) {
        // 政治家所属政党（政党含むのチェック）
        if (!Array.isArray(arg.hc_member.politician.political_party_members)) return false;
        if (
          arg.hc_member.politician.political_party_members.some((v) => !isPoliticalPartyMember(v))
        )
          return false;

        // 政治家部分のチェック
        if (!isPolitician(arg.hc_member.politician)) return false;
      }

      // 共通部分のチェック
      if (!isHcMember(arg.hc_member)) return false;
    }

    // 支持投票期間のチェック
    if (isPropertyAccessible(arg.current_cv_term)) {
      if (!isCvTerm(arg.current_cv_term)) return false;
    }

    // is_active_house_member === true時の共通部分のチェック
    if (
      !(
        typeof arg.is_my_constituency_member === 'boolean' || arg.is_my_constituency_member === null
      ) ||
      !(
        typeof arg.is_login_user_possible_to_cv_on_term === 'boolean' ||
        arg.is_login_user_possible_to_cv_on_term === null
      )
    )
      return false;
  }

  // 共通部分のチェック（is_active_house_member === true/false）
  return typeof arg.is_login === 'boolean' && typeof arg.is_active_house_member === 'boolean';
};
