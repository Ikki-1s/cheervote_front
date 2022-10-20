///// 入力系 /////
// サインアップ
export type SignUpParams = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  hr_constituency_id: number;
  hc_constituency_id: number;
  prefecture_id: number;
};

// サインイン
export type SignInParams = {
  email: string;
  password: string;
};

// Cheervote評価値
export type CheervoteEvaluationParams = {
  // evaluation: number;
  evaluation: string;
};

// apiに送信するCheervote投票内容
export type CheervotePostData = {
  which_house: string | null;
  politician_id: number | null;
  member_id: number | null;
  cv_term_id: number | null;
  cv_question_id: number;
  cv_evaluation_id: number | null;
};

///// 取得系 /////
// 支持投票ページ表示用データ
export type CheervotePageData = {
  is_login: boolean;
  is_active_house_member: boolean;
  hc_member?: HcMemberOrigin & {
    hc_election_time: HcElectionTime;
    hc_constituency?: HcConstituency;
    politician: Politician & {
      political_party_members: PoliticalPartyMember[];
    };
  };
  hr_member?: HrMemberOrigin & {
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

// 認証済みユーザー(data部分)（auth/sessions）
export type CurrentUser = {
  is_login: boolean;
  message?: string;
  data?: User;
};

// 支持投票評価値
export type CvEvaluationValue = {
  id: number;
  cv_question_id: number;
  value: number;
  value_name: string | null;
};

// 支持投票期間（衆議院・参議院）
export type CvTerm = {
  id: number;
  start_date: string;
  end_date: string;
  created_at?: string;
  updated_at?: string;
};

// 支持投票設問
export type CvQuestion = {
  id: number;
  question_sentence: string;
  note: string | null;
};

// 参議院選挙区
export type HcConstituency = {
  id: number;
  name: string;
  quota?: number;
  reelection_number?: number;
};

// 参議院選挙回
export type HcElectionTime = {
  id: number;
  election_time: number;
  announcement_date: string;
  election_date: string;
  expiration_date: string | null;
};

// 参議院議員
export type HcMember = {
  id: number;
  elected_system: number;
  hc_constituency?: {
    id: number;
    name: string;
  };
};

// 参議院議員（テーブル定義に忠実）
export type HcMemberOrigin = {
  id: number;
  politician_id: number;
  hc_election_time_id: number;
  elected_system: number;
  hc_constituency_id: number | null;
  mid_term_start_date: string | null;
  mid_term_start_reason: string | null;
  mid_term_end_date: string | null;
  mid_term_end_reason: string | null;
};

// 参議院選挙区の参議院議員
export type HcMemberOfHcConstituency = {
  id: number;
  hc_constituency: HcConstituency;
  hc_election_time: {
    id: number;
    election_time: number;
    expiration_date: string;
  };
  politician: PoliticianWithPoliticalParty;
};

// 参議院全国比例の参議院議員
export type HcMemberOfHcPr = {
  id: number;
  hc_election_time: {
    id: number;
    election_time: number;
    expiration_date: string;
  };
  politician: PoliticianWithPoliticalParty;
};

// 参議院議員（選挙回・選挙区含む）
export type HcMemberWithAssociateData = HcMemberOrigin & {
  hc_election_time: HcElectionTime;
  hc_constituency?: HcConstituency;
};

// 衆議院小選挙区
export type HrConstituency = {
  id: number;
  name: string;
  constituent_region?: string;
  prefecture_id?: number;
};

// 衆議院小選挙区（都道府県含む）
export type HrConstituencyWithPref = HrConstituency & {
  prefecture: Prefecture;
};

// 衆議院選挙回
export type HrElectionTime = {
  id: number;
  election_time: number;
  announcement_date: string;
  election_date: string;
  expiration_date: string | null;
  dissolution_date: string | null;
};

// 衆議院議員
export type HrMember = {
  id: number;
  elected_system: number;
  hr_constituency?: {
    id: number;
    name: string;
    prefecture: {
      id: number;
      prefecture: string;
    };
  };
  hr_pr_block?: {
    id: number;
    block_name: string;
  };
};

// 衆議院議員（テーブル定義に忠実）
export type HrMemberOrigin = {
  id: number;
  politician_id: number;
  hr_election_time_id: number;
  elected_system: number;
  hr_constituency_id: number | null;
  hr_pr_block_id: number | null;
  mid_term_start_date: string | null;
  mid_term_start_reason: string | null;
  mid_term_end_date: string | null;
  mid_term_end_reason: string | null;
};

// 都道府県の衆議院議員
export type HrMemberOfPrefecture = {
  id: number;
  hr_constituency: {
    id: number;
    name: string;
  };
  politician: PoliticianWithPoliticalParty;
};

// 衆議院比例代表ブロックの衆議院議員
export type HrMemberOfHrPrBlock = {
  id: number;
  hr_pr_block: {
    id: number;
    block_name: string;
    quota: number;
  };
  // politician: Politician;
  politician: PoliticianWithPoliticalParty;
};

// 衆議院議員（選挙回・小選挙区・比例ブロック含む）
export type HrMemberWithAssociateData = HrMemberOrigin & {
  hr_election_time: HrElectionTime;
  hr_constituency?: HrConstituencyWithPref;
  hr_pr_block?: HrPrBlock;
};

// 衆議院比例代表ブロック
export type HrPrBlock = {
  id: number;
  block_name: string;
  quota?: number;
};

// 政党
export type PoliticalParty = {
  id: number;
  name_kanji: string;
  name_kana?: string;
  abbreviation_kanji?: string;
  abbreviation_kana?: string | null;
};

// 政治家所属政党
export type PoliticalPartyMember = {
  id: number;
  politician_id: number;
  political_party_id: number;
  start_belonging_date: string | null;
  end_belonging_date: string | null;
  political_party: PoliticalParty;
};

// 現役国会議員のいる政党
export type PoliticalPartyHavingActiveMember = {
  id: number;
  name: string;
};

// 政党の参議院議員
export type PoliticalPartyHcMember = {
  id: number;
  politician: {
    id: number;
    last_name_kanji: string;
    first_name_kanji: string;
    last_name_kana: string;
    first_name_kana: string;
    hc_members: HcMember[];
  };
};

// 政党の衆議院議員
export type PoliticalPartyHrMember = {
  id: number;
  politician: {
    id: number;
    last_name_kanji: string;
    first_name_kanji: string;
    last_name_kana: string;
    first_name_kana: string;
    hr_members: HrMember[];
  };
};

// 政治家所属政党
export type PoliticalPartyOfPolitician = {
  political_party: PoliticalParty;
  // political_party: {
  //   name_kanji: string;
  //   abbreviation_kanji: string;
  // };
};

// 政治家
export type Politician = {
  id: number;
  last_name_kanji: string;
  first_name_kanji: string;
  last_name_kana: string;
  first_name_kana: string;
  career?: string | null;
  website?: string | null;
  twitter?: string | null;
  youtube?: string | null;
  facebook?: string | null;
  other_sns?: string | null;
};

// 政治家（所属政党のみ含む）
export type PoliticianWithPoliticalParty = Politician & {
  political_party_members: PoliticalPartyOfPolitician[];
};

// 政治家（関連テーブルデータ含む）
export type PoliticianWithAssociateData = Politician & {
  hr_members?: HrMemberWithAssociateData[];
  hc_members?: HcMemberWithAssociateData[];
  political_party_members: PoliticalPartyMember[];
};

// 都道府県
export type Prefecture = {
  id: number;
  prefecture: string;
};

// 支持投票結果の円グラフ表示用データ
export type ResultForPieChart = {
  labels: string[];
  which_house: string;
  data: number[];
  total: number;
};

// ユーザー
export type User = {
  id: number;
  provider: string;
  uid: string;
  allow_password_change: boolean;
  name: string;
  nickname: string | null;
  image: string | null;
  email: string;
  // created_at: Date;
  created_at: string;
  // updated_at: Date;
  updated_at: string;
  hr_constituency_id: number;
  hc_constituency_id: number;
  prefecture_id: number;
};
