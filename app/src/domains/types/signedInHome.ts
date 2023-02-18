import {
  CvTerm,
  HcConstituency,
  HcMemberOfConstituency,
  HrConstituencyWithPref,
  HrMember,
  HrPrBlock,
  isCvTerm,
  isHcConstituency,
  isHcMemberOfConstituency,
  isHrConstituencyWithPref,
  isHrMember,
  isHrPrBlock,
  isPoliticianWithAssociateData,
  isPropertyAccessible,
  PoliticianWithAssociateData,
} from 'domains';

// ログイン後のCHEERVOTE TOPページ表示用データ
export type SignedInHome = {
  user_name: string;
  hr_constituency: HrConstituencyWithPref;
  hr_pr_block: HrPrBlock;
  hc_constituency: HcConstituency;
  current_hr_cv_term: CvTerm | null;
  current_hc_cv_term: CvTerm | null;
  hr_members: [
    HrMember & {
      hr_constituency?: HrConstituencyWithPref;
      hr_pr_block?: HrPrBlock;
      politician: PoliticianWithAssociateData;
      voted_status: 'voted' | 'unvoted' | 'out_of_term';
    },
  ];
  hc_members: [
    HcMemberOfConstituency & {
      voted_status: 'voted' | 'unvoted' | 'out_of_term';
    },
  ];
};

export const isSignedInHome = (arg: unknown): arg is SignedInHome => {
  // プロパティアクセス出来ない可能性を排除
  // ※current_hr_cv_termとcurrent_hc_cv_termはnullも許容するので
  //  ここではチェックしない
  if (
    !isPropertyAccessible(arg) ||
    !isPropertyAccessible(arg.hr_constituency) ||
    !isPropertyAccessible(arg.hr_pr_block) ||
    !isPropertyAccessible(arg.hc_constituency) ||
    !isPropertyAccessible(arg.hr_members) ||
    !isPropertyAccessible(arg.hc_members)
  )
    return false;

  // 衆議院小選挙区（都道府県含む）部分のチェック
  if (!isHrConstituencyWithPref(arg.hr_constituency)) return false;

  // 衆議院比例代表ブロック部分のチェック
  if (!isHrPrBlock(arg.hr_pr_block)) return false;

  // 参議院選挙区部分のチェック
  if (!isHcConstituency(arg.hc_constituency)) return false;

  // 現在の評価投票期間（衆議院）部分がnilでない場合のチェック
  if (isPropertyAccessible(arg.current_hr_cv_term) && !isCvTerm(arg.current_hr_cv_term))
    return false;

  // 現在の評価投票期間（参議院）部分がnilでない場合のチェック
  if (isPropertyAccessible(arg.current_hc_cv_term) && !isCvTerm(arg.current_hc_cv_term))
    return false;

  // 衆議院議員部分のチェック
  // 配列か否かを判定
  if (!Array.isArray(arg.hr_members)) return false;
  if (
    arg.hr_members.some((v) => {
      !isHrConstituencyWithPref(v.hr_constituency) ||
        !isPoliticianWithAssociateData(v.politician) ||
        !(v.voted_status === ('voted' || 'unvoted' || 'out_of_term')) ||
        !isHrMember(v);
    })
  )
    return false;

  // 参議院議員部分のチェック
  // 配列か否かを判定
  if (!Array.isArray(arg.hc_members)) return false;
  if (
    arg.hc_members.some((v) => {
      !(v.voted_status === ('voted' || 'unvoted' || 'out_of_term')) || !isHcMemberOfConstituency(v);
    })
  )
    return false;

  // user_name部分のチェック
  return typeof arg.user_name === 'string';
};
