import {
  isPropertyAccessible,
  isHrConstituency,
  isPoliticalParty,
  isPolitician,
  HrConstituency,
  PoliticalParty,
  Politician,
} from 'domains';

// 都道府県の衆議院議員
export type HrMemberOfPrefecture = {
  id: number;
  hr_constituency: HrConstituency;
  politician: Politician & {
    political_party_members: { political_party: PoliticalParty }[];
  };
};

export const isHrMemberOfPrefecture = (arg: unknown): arg is HrMemberOfPrefecture => {
  // プロパティアクセス出来ない可能性を排除
  if (
    !isPropertyAccessible(arg) ||
    !isPropertyAccessible(arg.hr_constituency) ||
    !isPropertyAccessible(arg.politician) ||
    !isPropertyAccessible(arg.politician.political_party_members)
  )
    return false;

  // 政治家所属政党部分のチェック
  // プロパティにオブジェクト配列を含んでいる場合の判定
  // 配列か否かを判定
  if (
    !Array.isArray(arg.politician.political_party_members) ||
    arg.politician.political_party_members.some((v) => !isPoliticalParty(v.political_party))
  ) {
    return false;
  }

  // 衆議院小選挙区部分のチェック
  if (!isHrConstituency(arg.hr_constituency)) return false;
  // 政治家部分のチェック
  if (!isPolitician(arg.politician)) return false;

  return typeof arg.id === 'number';
};
