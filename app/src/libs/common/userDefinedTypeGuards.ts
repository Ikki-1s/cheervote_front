import {
  CheervotePageData,
  CurrentUser,
  CvEvaluationValue,
  CvQuestion,
  CvTerm,
  HcConstituency,
  HcElectionTime,
  HcMemberOrigin,
  HcMemberWithAssociateData,
  HrConstituency,
  HrConstituencyWithPref,
  HrElectionTime,
  HrMemberOrigin,
  HrMemberWithAssociateData,
  HrPrBlock,
  PoliticalParty,
  PoliticalPartyMember,
  Politician,
  PoliticianWithAssociateData,
  Prefecture,
  ResultForPieChart,
  User,
} from 'types';

////// ユーザー定義型ガード集 //////
// created_at・updated_atのチェックは基本的に行わない

// プロパティアクセス出来ない可能性を排除
// export const isPropertyAccessible = (arg: unknown): arg is { [key: string]: unknown } => {
export const isPropertyAccessible = (arg: unknown): arg is Record<string, unknown> => {
  // 以下の記述でnullとundefinedの両方の可能性を排除
  return arg != null;
};

/// 支持投票ページ用 ///
export const isCheervotePageData = (arg: unknown): arg is CheervotePageData => {
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

/// 認証済みユーザー ///
export const isCurrentUser = (arg: unknown): arg is CurrentUser => {
  if (!isPropertyAccessible(arg)) return false;

  // ユーザー部分のチェック
  if (isPropertyAccessible(arg.data)) {
    if (!isUser(arg.data)) return false;
  }

  // CurrentUser固有部分のチェック
  return (
    typeof arg.is_login === 'boolean' && ('message' in arg ? typeof arg.message === 'string' : true)
  );
};

/// 支持投票評価値 ///
export const isCvEvaluationValue = (arg: unknown): arg is CvEvaluationValue => {
  if (!isPropertyAccessible(arg)) return false;
  return (
    typeof arg.id === 'number' &&
    typeof arg.cv_question_id === 'number' &&
    typeof arg.value === 'number' &&
    (typeof arg.value_name === 'string' || arg.value_name === null)
  );
};

/// 支持投票期間(衆議院・参議院) ///
export const isCvTerm = (arg: unknown): arg is CvTerm => {
  if (!isPropertyAccessible(arg)) return false;
  return (
    typeof arg.id === 'number' &&
    typeof arg.start_date === 'string' &&
    typeof arg.end_date === 'string'
  );
};

/// 支持投票設問 ///
export const isCvQuestion = (arg: unknown): arg is CvQuestion => {
  if (!isPropertyAccessible(arg)) return false;
  return (
    typeof arg.id === 'number' &&
    typeof arg.question_sentence === 'string' &&
    (typeof arg.note === 'string' || arg.note === null)
  );
};

/// 支持投票設問 & 支持投票評価値 ///
export const isCvQuestionData = (
  arg: unknown,
): arg is { cv_question: CvQuestion; cv_evaluation_values: CvEvaluationValue[] } => {
  if (
    !isPropertyAccessible(arg) ||
    !isPropertyAccessible(arg.cv_question) ||
    !isPropertyAccessible(arg.cv_evaluation_values)
  )
    return false;

  // 支持投票評価値の配列のチェック
  if (!Array.isArray(arg.cv_evaluation_values)) return false;
  if (arg.cv_evaluation_values.some((v) => !isCvEvaluationValue(v))) return false;

  // 支持投票設問の部分のチェック
  return isCvQuestion(arg.cv_question);
};

/// 参議院選挙区 ///
export const isHcConstituency = (arg: unknown): arg is HcConstituency => {
  if (!isPropertyAccessible(arg)) return false;
  return (
    typeof arg.id === 'number' &&
    typeof arg.name === 'string' &&
    ('quota' in arg ? typeof arg.quota === 'number' : true) &&
    ('reelection_number' in arg ? typeof arg.reelection_number === 'number' : true)
  );
};

/// 参議院選挙回 ///
export const isHcElectionTime = (arg: unknown): arg is HcElectionTime => {
  if (!isPropertyAccessible(arg)) return false;
  return (
    typeof arg.id === 'number' &&
    typeof arg.election_time === 'number' &&
    typeof arg.announcement_date === 'string' &&
    typeof arg.election_date === 'string' &&
    (typeof arg.expiration_date === 'string' || arg.expiration_date === null)
  );
};

/// 参議院議員(テーブルに忠実) ///
export const isHcMember = (arg: unknown): arg is HcMemberOrigin => {
  if (!isPropertyAccessible(arg)) return false;
  return (
    typeof arg.id === 'number' &&
    typeof arg.politician_id === 'number' &&
    typeof arg.hc_election_time_id === 'number' &&
    typeof arg.elected_system === 'number' &&
    (typeof arg.hc_constituency_id === 'number' || arg.hc_constituency_id === null) &&
    (typeof arg.mid_term_start_date === 'string' || arg.mid_term_start_date === null) &&
    (typeof arg.mid_term_start_reason === 'string' || arg.mid_term_start_reason === null) &&
    (typeof arg.mid_term_end_date === 'string' || arg.mid_term_end_date === null) &&
    (typeof arg.mid_term_end_reason === 'string' || arg.mid_term_end_reason === null)
  );
};

/// 参議院議員（選挙回・選挙区含む） ///
export const isHcMemberWithAssociateData = (arg: unknown): arg is HcMemberWithAssociateData => {
  if (!isPropertyAccessible(arg) || !isPropertyAccessible(arg.hc_election_time)) return false;

  // 参議院選挙区がある場合のチェック
  if (isPropertyAccessible(arg.hc_constituency) && !isHcConstituency(arg.hc_constituency))
    return false;

  // 参議院選挙回のチェック
  if (!isHcElectionTime(arg.hc_election_time)) return false;

  // 参議院議員のチェック
  return isHcMember(arg);
};

/// 衆議院小選挙区 ///
export const isHrConstituency = (arg: unknown): arg is HrConstituency => {
  if (!isPropertyAccessible(arg)) return false;
  return (
    typeof arg.id === 'number' &&
    typeof arg.name === 'string' &&
    ('constituent_region' in arg
      ? typeof arg.constituent_region === 'string' || arg.constituent_region === null
      : true) &&
    ('prefecture_id' in arg ? typeof arg.prefecture_id === 'number' : true)
  );
};

/// 衆議院小選挙区（都道府県含む） ///
export const isHrConstituencyWithPref = (arg: unknown): arg is HrConstituencyWithPref => {
  if (!isPropertyAccessible(arg) || !isPropertyAccessible(arg.prefecture)) return false;

  // 都道府県のチェック
  if (!isPrefecture(arg.prefecture)) return false;

  // 衆議院小選挙区部分のチェック
  return isHrConstituency(arg);
};

/// 衆議院選挙回 ///
export const isHrElectionTime = (arg: unknown): arg is HrElectionTime => {
  if (!isPropertyAccessible(arg)) return false;
  return (
    typeof arg.id === 'number' &&
    typeof arg.election_time === 'number' &&
    typeof arg.announcement_date === 'string' &&
    typeof arg.election_date === 'string' &&
    (typeof arg.expiration_date === 'string' || arg.expiration_date === null) &&
    (typeof arg.dissolution_date === 'string' || arg.dissolution_date === null)
  );
};

/// 衆議院議員(テーブルに忠実) ///
export const isHrMember = (arg: unknown): arg is HrMemberOrigin => {
  if (!isPropertyAccessible(arg)) return false;
  return (
    typeof arg.id === 'number' &&
    typeof arg.politician_id === 'number' &&
    typeof arg.hr_election_time_id === 'number' &&
    typeof arg.elected_system === 'number' &&
    (typeof arg.hr_constituency_id === 'number' || arg.hr_constituency_id === null) &&
    (typeof arg.hr_pr_block_id === 'number' || arg.hr_pr_block_id === null) &&
    (typeof arg.mid_term_start_date === 'string' || arg.mid_term_start_date === null) &&
    (typeof arg.mid_term_start_reason === 'string' || arg.mid_term_start_reason === null) &&
    (typeof arg.mid_term_end_date === 'string' || arg.mid_term_end_date === null) &&
    (typeof arg.mid_term_end_reason === 'string' || arg.mid_term_end_reason === null)
  );
};

/// 衆議院比例代表ブロック ///
export const isHrPrBlock = (arg: unknown): arg is HrPrBlock => {
  if (!isPropertyAccessible(arg)) return false;
  return (
    typeof arg.id === 'number' &&
    typeof arg.block_name === 'string' &&
    ('quota' in arg ? typeof arg.quota === 'number' : true)
  );
};

/// 衆議院議員（選挙回・小選挙区・比例ブロック含む） ///
export const isHrMemberWithAssociateData = (arg: unknown): arg is HrMemberWithAssociateData => {
  if (!isPropertyAccessible(arg) || !isPropertyAccessible(arg.hr_election_time)) return false;

  // 衆議院小選挙区がある場合のチェック
  if (isPropertyAccessible(arg.hr_constituency) && !isHrConstituencyWithPref(arg.hr_constituency))
    return false;

  // 衆議院比例代表ブロックがある場合のチェック
  if (isPropertyAccessible(arg.hr_pr_block) && !isHrPrBlock(arg.hr_pr_block)) return false;

  // 衆議院選挙回のチェック
  if (!isHrElectionTime(arg.hr_election_time)) return false;

  // 衆議院議員のチェック
  return isHrMember(arg);
};

/// 政党 ///
export const isPoliticalParty = (arg: unknown): arg is PoliticalParty => {
  if (!isPropertyAccessible(arg)) return false;
  return (
    typeof arg.id === 'number' &&
    typeof arg.name_kanji === 'string' &&
    ('name_kana' in arg ? typeof arg.name_kana === 'string' : true) &&
    ('abbreviation_kanji' in arg ? typeof arg.abbreviation_kanji === 'string' : true) &&
    ('abbreviation_kana' in arg
      ? typeof arg.abbreviation_kana === 'string' || arg.abbreviation_kana === null
      : true)
  );
};

/// 政治家所属政党（政党含む） ///
export const isPoliticalPartyMember = (arg: unknown): arg is PoliticalPartyMember => {
  if (!isPropertyAccessible(arg) || !isPropertyAccessible(arg.political_party)) return false;

  if (!isPoliticalParty(arg.political_party)) return false;

  return (
    typeof arg.id === 'number' &&
    typeof arg.politician_id === 'number' &&
    typeof arg.political_party_id === 'number' &&
    (typeof arg.start_belonging_date === 'string' || arg.start_belonging_date === null) &&
    (typeof arg.end_belonging_date === 'string' || arg.end_belonging_date === null)
  );
};

/// 政治家 ///
export const isPolitician = (arg: unknown): arg is Politician => {
  if (!isPropertyAccessible(arg)) return false;
  return (
    typeof arg.id === 'number' &&
    typeof arg.last_name_kanji === 'string' &&
    typeof arg.first_name_kanji === 'string' &&
    typeof arg.last_name_kana === 'string' &&
    typeof arg.first_name_kana === 'string' &&
    ('career' in arg ? typeof arg.career === 'string' || arg.career === null : true) &&
    ('website' in arg ? typeof arg.website === 'string' || arg.website === null : true) &&
    ('twitter' in arg ? typeof arg.twitter === 'string' || arg.twitter === null : true) &&
    ('youtube' in arg ? typeof arg.youtube === 'string' || arg.youtube === null : true) &&
    ('facebook' in arg ? typeof arg.facebook === 'string' || arg.facebook === null : true) &&
    ('other_sns' in arg ? typeof arg.other_sns === 'string' || arg.other_sns === null : true)
  );
};

/// 政治家（関連テーブルデータ含む） ///
export const isPoliticianWithAssociateData = (arg: unknown): arg is PoliticianWithAssociateData => {
  if (!isPropertyAccessible(arg) || !isPropertyAccessible(arg.political_party_members))
    return false;

  // political_party_members部分のチェック
  // 配列か否かを判定
  if (!Array.isArray(arg.political_party_members)) return false;
  // 全てPoliticalPartyMember型か否かを判定
  if (arg.political_party_members.some((v) => !isPoliticalPartyMember(v))) return false;

  // hr_members部分のデータがある場合のチェック
  if (
    Array.isArray(arg.hr_members) &&
    arg.hr_members.length &&
    arg.hr_members.some((v) => !isHrMemberWithAssociateData(v))
  )
    return false;

  // hc_members部分のデータがある場合のチェック
  if (
    Array.isArray(arg.hc_members) &&
    arg.hc_members.length &&
    arg.hc_members.some((v) => !isHcMemberWithAssociateData(v))
  )
    return false;

  // 政治家部分のチェック
  return isPolitician(arg);
};

/// 都道府県 ///
export const isPrefecture = (arg: unknown): arg is Prefecture => {
  if (!isPropertyAccessible(arg)) return false;
  return typeof arg.id === 'number' && typeof arg.prefecture === 'string';
};

// 支持投票結果の円グラフ表示用データ
export const isResultForPieChart = (arg: unknown): arg is ResultForPieChart => {
  if (!isPropertyAccessible(arg)) return false;
  return (
    Array.isArray(arg.labels) &&
    arg.labels.every((v) => typeof v === 'string') &&
    typeof arg.which_house === 'string' &&
    Array.isArray(arg.data) &&
    arg.data.every((v) => typeof v === 'number') &&
    typeof arg.total === 'number'
  );
};

/// ユーザー ///
export const isUser = (arg: unknown): arg is User => {
  if (!isPropertyAccessible(arg)) return false;
  return (
    typeof arg.id === 'number' &&
    typeof arg.provider === 'string' &&
    typeof arg.uid === 'string' &&
    typeof arg.allow_password_change === 'boolean' &&
    typeof arg.name === 'string' &&
    (typeof arg.nickname === 'string' || arg.nickname === null) &&
    (typeof arg.image === 'string' || arg.image === null) &&
    typeof arg.email === 'string' &&
    typeof arg.created_at === 'string' &&
    typeof arg.updated_at === 'string' &&
    typeof arg.hr_constituency_id === 'number' &&
    typeof arg.hc_constituency_id === 'number' &&
    typeof arg.prefecture_id === 'number'
  );
};
