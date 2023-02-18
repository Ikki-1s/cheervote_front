import {
  isPropertyAccessible,
  Politician,
  isPolitician,
  HcMember,
  isHcMember,
  HcConstituency,
  isHcConstituency,
} from 'domains';

// 政党の参議院議員
export type PoliticalPartyHcMember = {
  id: number;
  politician: Politician & {
    hc_members: [HcMember & { hc_constituency?: HcConstituency }];
  };
};

export const isPoliticalPartyHcMember = (arg: unknown): arg is PoliticalPartyHcMember => {
  if (
    !isPropertyAccessible(arg) ||
    !isPropertyAccessible(arg.politician) ||
    !isPropertyAccessible(arg.politician.hc_members)
  )
    return false;

  // 参議院選挙区がある場合のチェック
  if (
    isPropertyAccessible(arg.politician.hc_members.hc_constituency) &&
    !isHcConstituency(arg.politician.hc_members.hc_constituency)
  )
    return false;

  if (!Array.isArray(arg.politician.hc_members))
    // 参議院議員部分のチェック
    // プロパティにオブジェクト配列を含んでいる場合の判定
    // 配列か否かを判定
    return false;
  // 全てHcMember型か否かを判定
  if (arg.politician.hc_members.some((v) => !isHcMember(v))) return false;

  // 政治家部分のチェック
  if (!isPolitician(arg.politician)) return false;

  // 政治家所属政党部分のチェック
  return typeof arg.id === 'number';
};
