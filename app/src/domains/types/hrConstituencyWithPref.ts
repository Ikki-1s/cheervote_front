import {
  HrConstituency,
  isHrConstituency,
  isPrefecture,
  isPropertyAccessible,
  Prefecture,
} from 'domains';

// 衆議院小選挙区（都道府県含む）
export type HrConstituencyWithPref = HrConstituency & {
  prefecture: Prefecture;
};

export const isHrConstituencyWithPref = (arg: unknown): arg is HrConstituencyWithPref => {
  if (!isPropertyAccessible(arg) || !isPropertyAccessible(arg.prefecture)) return false;

  // 都道府県のチェック
  if (!isPrefecture(arg.prefecture)) return false;

  // 衆議院小選挙区部分のチェック
  return isHrConstituency(arg);
};
