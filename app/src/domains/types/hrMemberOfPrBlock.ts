import {
  isPropertyAccessible,
  isHrPrBlock,
  isPoliticalParty,
  isPolitician,
  HrPrBlock,
  PoliticalParty,
  Politician,
} from 'domains';

// 衆議院比例代表ブロックの衆議院議員
export type HrMemberOfPrBlock = {
  id: number;
  hr_pr_block: HrPrBlock;
  politician: Politician & {
    political_party_members: { political_party: PoliticalParty }[];
  };
};

export const isHrMemberOfPrBlock = (arg: unknown): arg is HrMemberOfPrBlock => {
  // プロパティアクセス出来ない可能性を排除
  if (
    !isPropertyAccessible(arg) ||
    !isPropertyAccessible(arg.hr_pr_block) ||
    !isPropertyAccessible(arg.politician) ||
    !isPropertyAccessible(arg.politician.political_party_members)
  )
    return false;

  // 政治家所属政党部分のチェック
  // プロパティにオブジェクト配列を含んでいる場合の判定
  if (
    !Array.isArray(arg.politician.political_party_members) ||
    arg.politician.political_party_members.some((v) => !isPoliticalParty(v.political_party))
  )
    return false;

  // 衆議院比例代表ブロック部分のチェック
  if (!isHrPrBlock(arg.hr_pr_block)) return false;
  // 政治家部分のチェック
  if (!isPolitician(arg.politician)) return false;

  return typeof arg.id === 'number';
};
