import {
  isPropertyAccessible,
  isHcConstituency,
  isHcElectionTime,
  isPoliticalParty,
  isPolitician,
  HcConstituency,
  HcElectionTime,
  PoliticalParty,
  Politician,
} from 'domains';

// 参議院選挙区の参議院議員
export type HcMemberOfConstituency = {
  id: number;
  hc_constituency: HcConstituency;
  hc_election_time: HcElectionTime;
  politician: Politician & {
    political_party_members: { political_party: PoliticalParty }[];
  };
};

export const isHcMemberOfConstituency = (arg: unknown): arg is HcMemberOfConstituency => {
  // プロパティアクセス出来ない可能性を排除
  if (
    !isPropertyAccessible(arg) ||
    !isPropertyAccessible(arg.hc_constituency) ||
    !isPropertyAccessible(arg.hc_election_time) ||
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

  // 参議院選挙区部分のチェック
  if (!isHcConstituency(arg.hc_constituency)) return false;
  // 参議院選挙回部分のチェック
  if (!isHcElectionTime(arg.hc_election_time)) return false;
  // 政治家部分のチェック
  if (!isPolitician(arg.politician)) return false;

  // 参議院議員部分のチェック
  return typeof arg.id === 'number';
};
