import axios from 'axios';
import { isPoliticalParty, isPoliticalPartyHavingActiveMember } from 'domains';

// 政党一覧を取得
// ・所属国会議員数（衆議院＋参議院）の多い政党順
// ・現在所属議員のいない政党は除外
export const getPoliticalPartiesHavingActiveMembers = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/political_parties/active`);
  const politicalPartiesHavingActiveMembers = await res.data;

  if (
    Array.isArray(politicalPartiesHavingActiveMembers) &&
    politicalPartiesHavingActiveMembers.length &&
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
    politicalPartiesHavingActiveMembers.length &&
    politicalPartiesHavingActiveMembers.every(isPoliticalPartyHavingActiveMember)
  ) {
    ///////////// ゲストユーザー用 /////////////
    politicalPartiesHavingActiveMembers[politicalPartiesHavingActiveMembers.length] = {
      id: 17,
      name_kanji: '（架空）ＹＹ党',
      name_kana: 'わいわいとう',
      total: 7,
      hr_count: 3,
      hc_count: 4,
    };
    ///////////// ゲストユーザー用 /////////////
    return politicalPartiesHavingActiveMembers.map((politicalParty) => {
      return {
        params: {
          id: politicalParty.id.toString(),
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

  if (
    Array.isArray(politicalPartyData) &&
    politicalPartyData.length &&
    politicalPartyData.every(isPoliticalParty)
  ) {
    const politicalPartyName = politicalPartyData[0].name_kanji;
    return politicalPartyName;
  } else {
    throw new Error();
  }
};
