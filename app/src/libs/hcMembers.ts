import fetch from 'node-fetch';

import { HcMemberOfHcConstituency, HcMemberOfHcPr } from 'types/hcMember';
import { PoliticalPartyOfPolitician } from 'types/politicalParty';

// ユーザー定義型ガード
// const isPropertyAccessible = (data: unknown): data is { [key: string]: unknown } => {
const isPropertyAccessible = (arg: unknown): arg is Record<string, unknown> => {
  return arg != null;
};

const isPoliticalParty = (arg: unknown): arg is PoliticalPartyOfPolitician => {
  if (!isPropertyAccessible(arg) || !isPropertyAccessible(arg.political_party)) return false;
  return (
    typeof arg.political_party.name_kanji === 'string' &&
    typeof arg.political_party.abbreviation_kanji === 'string'
  );
};

const isHcMemberOfHcConstituency = (arg: unknown): arg is HcMemberOfHcConstituency => {
  // プロパティアクセス出来ない可能性を排除
  if (
    !isPropertyAccessible(arg) ||
    !isPropertyAccessible(arg.hc_constituency) ||
    !isPropertyAccessible(arg.hc_election_time) ||
    !isPropertyAccessible(arg.politician) ||
    !isPropertyAccessible(arg.politician.political_party_members)
  )
    return false;

  // プロパティにオブジェクト配列を含んでいる場合の判定
  // 配列か否かを判定
  if (!Array.isArray(arg.politician.political_party_members)) return false;
  // 全てPoliticalParty型か否かを判定
  if (arg.politician.political_party_members.some((v) => !isPoliticalParty(v))) return false;

  return (
    typeof arg.id === 'number' &&
    typeof arg.hc_constituency.id === 'number' &&
    typeof arg.hc_constituency.name === 'string' &&
    typeof arg.hc_constituency.quota === 'number' &&
    typeof arg.hc_election_time.id === 'number' &&
    typeof arg.hc_election_time.election_time === 'number' &&
    typeof arg.hc_election_time.expiration_date === 'string' &&
    typeof arg.politician.id === 'number' &&
    typeof arg.politician.last_name_kanji === 'string' &&
    typeof arg.politician.first_name_kanji === 'string' &&
    typeof arg.politician.last_name_kana === 'string' &&
    typeof arg.politician.first_name_kana === 'string'
  );
};

const isHcMemberOfHcPr = (arg: unknown): arg is HcMemberOfHcPr => {
  // プロパティアクセス出来ない可能性を排除
  if (
    !isPropertyAccessible(arg) ||
    !isPropertyAccessible(arg.hc_election_time) ||
    !isPropertyAccessible(arg.politician) ||
    !isPropertyAccessible(arg.politician.political_party_members)
  )
    return false;

  // プロパティにオブジェクト配列を含んでいる場合の判定
  // 配列か否かを判定
  if (!Array.isArray(arg.politician.political_party_members)) return false;
  // 全てPoliticalParty型か否かを判定
  if (arg.politician.political_party_members.some((v) => !isPoliticalParty(v))) return false;

  return (
    typeof arg.id === 'number' &&
    typeof arg.hc_election_time.id === 'number' &&
    typeof arg.hc_election_time.election_time === 'number' &&
    typeof arg.hc_election_time.expiration_date === 'string' &&
    typeof arg.politician.id === 'number' &&
    typeof arg.politician.last_name_kanji === 'string' &&
    typeof arg.politician.first_name_kanji === 'string' &&
    typeof arg.politician.last_name_kana === 'string' &&
    typeof arg.politician.first_name_kana === 'string'
  );
};

// 選挙区ごとの参議院議員
export const getHcMembersOfHcConstituencyData = async (hcConstituencyId: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/hc_members/hc_constituencies/${hcConstituencyId}`,
    { method: 'GET' },
  );
  const hcMembersOfHcConstituencyData = await res.json();
  if (
    Array.isArray(hcMembersOfHcConstituencyData) &&
    hcMembersOfHcConstituencyData.every(isHcMemberOfHcConstituency)
  ) {
    return hcMembersOfHcConstituencyData;
  } else {
    throw new Error();
  }
};

// 全国比例選出参議院議員
export const getHcMembresOfHcPrData = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/hc_members/hc_pr`, {
    method: 'GET',
  });
  const hcMembresOfHcPrData = await res.json();
  if (Array.isArray(hcMembresOfHcPrData) && hcMembresOfHcPrData.every(isHcMemberOfHcPr)) {
    return hcMembresOfHcPrData;
  } else {
    throw new Error();
  }
};
