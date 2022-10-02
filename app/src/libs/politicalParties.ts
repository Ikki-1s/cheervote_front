import axios from 'axios';

import { PoliticalParty, PoliticalPartyHavingActiveMember } from 'types';

// ユーザー定義型ガード
const isPropertyAccessible = (arg: unknown): arg is { [key: string]: unknown } => {
  // nullとundefinedの可能性を排除
  return arg != null;
};

const isPoliticalPartyHavingActiveMember = (
  arg: unknown,
): arg is PoliticalPartyHavingActiveMember => {
  if (!isPropertyAccessible(arg)) return false; // プロパティアクセス出来ない可能性を排除
  return typeof arg.id === 'number' && typeof arg.name === 'string';
};

const isPoliticalParty = (arg: unknown): arg is PoliticalParty => {
  if (!isPropertyAccessible(arg)) return false; // プロパティアクセス出来ない可能性を排除
  return (
    typeof arg.id === 'number' && typeof arg.name_kanji === 'string' // &&
    // typeof arg.name_kana === 'string' &&
    // typeof arg.abbreviation_kanji === 'string' &&
    // typeof arg.abbreviation_kana === 'string'
  );
};

// 政党一覧を取得
// ・所属国会議員数（衆議院＋参議院）の多い政党順
// ・現在所属議員のいない政党は除外
export const getPoliticalPartiesHavingActiveMembersData = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/political_parties/active`);
  const politicalPartiesHavingActiveMembers = await res.data;

  if (
    Array.isArray(politicalPartiesHavingActiveMembers) &&
    politicalPartiesHavingActiveMembers.every(isPoliticalPartyHavingActiveMember)
  ) {
    return politicalPartiesHavingActiveMembers;
  } else {
    throw new Error();
  }
};

export const getPoliticalPartiesHavingActiveMembersIds = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/political_parties/active`);
  const politicalPartiesHavingActiveMembers = await res.data;

  if (
    Array.isArray(politicalPartiesHavingActiveMembers) &&
    politicalPartiesHavingActiveMembers.every(isPoliticalPartyHavingActiveMember)
  ) {
    return politicalPartiesHavingActiveMembers.map((politicalPartyData) => {
      return {
        params: {
          id: politicalPartyData.id.toString(),
        },
      };
    });
  } else {
    throw new Error();
  }
};

export const getPoliticalPartyName = async (politicalPartyId: string) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/political_parties/${politicalPartyId}`,
  );
  const politicalPartyData = await res.data;

  if (Array.isArray(politicalPartyData) && politicalPartyData.every(isPoliticalParty)) {
    const politicalPartyName = politicalPartyData[0].name_kanji;
    return politicalPartyName;
  } else {
    throw new Error();
  }
};
