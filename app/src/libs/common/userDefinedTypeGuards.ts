import {
  CheervoteData,
  CurrentUser,
  CvEvaluationValue,
  CvQuestion,
  CvTerm,
  HcConstituency,
  HcElectionTime,
  HcMemberOrigin,
  HrConstituency,
  HrElectionTime,
  HrMemberOrigin,
  HrPrBlock,
  PoliticalParty,
  PoliticalPartyMember,
  Politician,
  Prefecture,
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

// 支持投票ページ用
export const isCheervoteData = (arg: unknown): arg is CheervoteData => {
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
          !isHrConstituency(arg.hr_member.hr_constituency)
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

// 認証済みユーザー
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

// 支持投票評価値
export const isCvEvaluationValue = (arg: unknown): arg is CvEvaluationValue => {
  if (!isPropertyAccessible(arg)) return false;
  return (
    typeof arg.id === 'number' &&
    typeof arg.cv_question_id === 'number' &&
    typeof arg.value === 'number' &&
    (typeof arg.value_name === 'string' || arg.value_name === null)
  );
};

// 支持投票期間(衆議院・参議院)
export const isCvTerm = (arg: unknown): arg is CvTerm => {
  if (!isPropertyAccessible(arg)) return false;
  return (
    typeof arg.id === 'number' &&
    typeof arg.start_date === 'string' &&
    typeof arg.end_date === 'string'
  );
};

// 支持投票設問
export const isCvQuestion = (arg: unknown): arg is CvQuestion => {
  if (!isPropertyAccessible(arg)) return false;
  return (
    typeof arg.id === 'number' &&
    typeof arg.question_sentence === 'string' &&
    (typeof arg.note === 'string' || arg.note === null)
  );
};

// 支持投票設問 & 支持投票評価値
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

// 参議院選挙区
export const isHcConstituency = (arg: unknown): arg is HcConstituency => {
  if (!isPropertyAccessible(arg)) return false;
  return (
    typeof arg.id === 'number' &&
    typeof arg.name === 'string' &&
    ('quota' in arg ? typeof arg.quota === 'number' : true) &&
    ('reelection_number' in arg ? typeof arg.reelection_number === 'number' : true)
  );
};

// 参議院選挙回
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

// 参議院議員(テーブルに忠実)
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

// 衆議院小選挙区
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

// 衆議院選挙回
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

// 衆議院議員(テーブルに忠実)
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

// 衆議院比例代表ブロック
export const isHrPrBlock = (arg: unknown): arg is HrPrBlock => {
  if (!isPropertyAccessible(arg)) return false;
  return (
    typeof arg.id === 'number' &&
    typeof arg.block_name === 'string' &&
    ('quota' in arg ? typeof arg.quota === 'number' : true)
  );
};

// 政党
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

// 政治家所属政党（政党含む）
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

// 政治家
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

// 都道府県
export const isPrefecture = (arg: unknown): arg is Prefecture => {
  if (!isPropertyAccessible(arg)) return false;
  return typeof arg.id === 'number' && typeof arg.prefecture === 'string';
};

// ユーザー
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
