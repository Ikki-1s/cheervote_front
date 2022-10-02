import axios from 'axios';
import {
  PoliticalParty,
  PoliticalPartyMember,
  Politician,
  PoliticianWithAssociateData,
} from 'types';

// ユーザー定義型ガード
const isPropertyAccessible = (value: unknown): value is { [key: string]: unknown } => {
  // nullとundefinedの可能性を排除
  return value != null;
};

const isPolitician = (arg: unknown): arg is Politician => {
  if (!isPropertyAccessible(arg)) return false; // プロパティアクセス出来ない可能性を排除
  return (
    typeof arg.id === 'number' &&
    typeof arg.last_name_kanji === 'string' &&
    typeof arg.first_name_kanji === 'string' &&
    typeof arg.last_name_kana === 'string' &&
    typeof arg.first_name_kana === 'string'
  );
};

const isPoliticalParty = (arg: unknown): arg is PoliticalParty => {
  if (!isPropertyAccessible(arg)) return false; // プロパティアクセス出来ない可能性を排除
  return (
    typeof arg.id === 'number' && typeof arg.name_kanji === 'string'
    // && 'name_kana' in arg ? typeof arg.name_kana === 'string' : true
    // && 'abbreviation_kanji' in arg ? typeof arg.abbreviation_kanji === 'string' : true
    // && 'abbreviation_kana' in arg ? (typeof arg.abbreviation_kana === 'string' || arg.abbreviation_kana === null) : true
  );
};

const isPoliticalPartyMember = (arg: unknown): arg is PoliticalPartyMember => {
  // プロパティアクセス出来ない可能性を排除
  if (!isPropertyAccessible(arg) || !isPropertyAccessible(arg.political_party)) return false;

  if (!isPoliticalParty(arg.political_party)) return false;

  return (
    typeof arg.id === 'number' &&
    typeof arg.politician_id === 'number' &&
    typeof arg.political_party_id === 'number' &&
    (typeof arg.start_belonging_date === 'string' || arg.start_belonging_date === null) &&
    (typeof arg.end_belonging_date === 'string' || arg.end_belonging_date === null)
  );
};

const isPoliticianWithAssociateData = (arg: unknown): arg is PoliticianWithAssociateData => {
  // プロパティアクセス出来ない可能性を排除
  if (!isPropertyAccessible(arg) || !isPropertyAccessible(arg.political_party_members))
    return false;
  // throw new Error();

  // プロパティにオブジェクト配列を含んでいる場合の判定
  // 配列か否かを判定
  if (!Array.isArray(arg.political_party_members)) return false;
  // throw new Error();

  // 全てPoliticalPartyMember型か否かを判定
  if (arg.political_party_members.some((v) => !isPoliticalPartyMember(v))) return false;
  // throw new Error();

  return (
    typeof arg.id === 'number' &&
    typeof arg.last_name_kanji === 'string' &&
    typeof arg.first_name_kanji == 'string' &&
    typeof arg.last_name_kana === 'string' &&
    typeof arg.first_name_kana === 'string'
  );
};

export const getAllPoliticiansIds = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/politicians`);
  const allPoliticiansData = await res.data;

  if (Array.isArray(allPoliticiansData) && allPoliticiansData.every(isPolitician)) {
    return allPoliticiansData.map((politicianData) => {
      return {
        params: {
          id: politicianData.id.toString(),
        },
      };
    });
  } else {
    throw new Error();
  }
};

// export const getAllPoliticiansData = async () => {
//   const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/politicians`);
//   const allPoliticiansData = await res.data;

//   if (Array.isArray(allPoliticiansData) && allPoliticiansData.every(isPolitician)) {
//     return allPoliticiansData;
//   } else {
//     throw new Error();
//   }
// };

export const getPoliticianWithAssociateData = async (politicianId: string) => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/politicians/${politicianId}`);
  const politicianWithAssociateData = await res.data;

  if (
    Array.isArray(politicianWithAssociateData) &&
    politicianWithAssociateData.every(isPoliticianWithAssociateData)
  ) {
    return politicianWithAssociateData;
  } else {
    throw new Error();
  }
};
