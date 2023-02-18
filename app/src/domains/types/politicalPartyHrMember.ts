import {
  isPropertyAccessible,
  Politician,
  isPolitician,
  HrMember,
  isHrMember,
  HrPrBlock,
  isHrPrBlock,
  HrConstituencyWithPref,
  isHrConstituencyWithPref,
} from 'domains';

// 政党の衆議院議員
export type PoliticalPartyHrMember = {
  id: number;
  politician: Politician & {
    hr_members: [
      HrMember & { hr_constituency?: HrConstituencyWithPref } & {
        hr_pr_block?: HrPrBlock;
      },
    ];
  };
};

export const isPoliticalPartyHrMember = (arg: unknown): arg is PoliticalPartyHrMember => {
  // 必須プロパティがアクセス可能かチェック
  if (
    !isPropertyAccessible(arg) ||
    !isPropertyAccessible(arg.politician) ||
    !isPropertyAccessible(arg.politician.hr_members)
  )
    return false;

  // 衆議院小選挙区部分がある場合のチェック
  if (
    isPropertyAccessible(arg.politician.hr_members.hr_constituency) &&
    !isHrConstituencyWithPref(arg.politician.hr_members.hr_constituency)
  )
    return false;

  // 衆議院比例代表ブロック部分がある場合のチェック
  if (
    isPropertyAccessible(arg.politician.hr_members.hr_pr_block) &&
    !isHrPrBlock(arg.politician.hr_members.hr_pr_block)
  )
    return false;

  if (!Array.isArray(arg.politician.hr_members))
    // 衆議院議員部分のチェック
    // プロパティにオブジェクト配列を含んでいる場合の判定
    // 配列か否かを判定
    return false;
  // 全てHrMember型か否かを判定
  if (arg.politician.hr_members.some((v) => !isHrMember(v))) return false;

  // 政治家部分のチェック
  if (!isPolitician(arg.politician)) return false;

  // 政治家所属政党部分のチェック
  return typeof arg.id === 'number';
};
