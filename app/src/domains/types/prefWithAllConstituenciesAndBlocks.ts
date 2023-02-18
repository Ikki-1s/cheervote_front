import {
  HcConstituency,
  HcConstituencyPref,
  HrConstituency,
  HrPrBlock,
  HrPrBlockPref,
  isHcConstituency,
  isHrConstituency,
  isHrPrBlock,
  isHrPrBlockPref,
  isPrefecture,
  isPropertyAccessible,
  Prefecture,
} from 'domains';

// 都道府県とそれに紐づく衆議院小選挙区、衆議院比例代表ブロック、参議院選挙区
export type PrefWithAllConstituenciesAndBlocks = Prefecture & {
  hr_constituencies: HrConstituency[];
  hr_pr_block_pref: HrPrBlockPref & {
    hr_pr_block: HrPrBlock;
  };
  hc_constituency_pref: HcConstituencyPref & {
    hc_constituency: HcConstituency;
  };
};

export const isPrefWithAllConstituenciesAndBlocks = (
  arg: unknown,
): arg is PrefWithAllConstituenciesAndBlocks => {
  if (
    !isPropertyAccessible(arg) ||
    !isPropertyAccessible(arg.hr_constituencies) ||
    !isPropertyAccessible(arg.hr_pr_block_pref) ||
    !isPropertyAccessible(arg.hr_pr_block_pref.hr_pr_block) ||
    !isPropertyAccessible(arg.hc_constituency_pref) ||
    !isPropertyAccessible(arg.hc_constituency_pref.hc_constituency)
  )
    return false;

  // 衆議院小選挙区部分（配列）のチェック
  if (!Array.isArray(arg.hr_constituencies)) return false;
  if (arg.hr_constituencies.some((v) => !isHrConstituency(v))) return false;

  // 衆議院比例代表ブロック部分のチェック
  if (!isHrPrBlock(arg.hr_pr_block_pref.hr_pr_block)) return false;

  // 参議院選挙区部分のチェック
  if (!isHcConstituency(arg.hc_constituency_pref.hc_constituency)) return false;

  // 衆議院比例代表ブロック構成都道府県部分のチェック
  if (!isHrPrBlockPref(arg.hr_pr_block_pref)) return false;

  // 参議院選挙区構成都道府県部分のチェック
  if (!isHrPrBlockPref(arg.hc_constituency_pref)) return false;

  // 都道府県部分のチェック
  return isPrefecture(arg);
};
