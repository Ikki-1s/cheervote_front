import axios from 'axios';

import {
  HrMember,
  HcMember,
  PoliticalPartyHrMember,
  PoliticalPartyHcMember,
} from 'types/politicalPartyMember';

// ユーザー定義型ガード
// const isPropertyAccessible = (data: unknown): data is { [key: string]: unknown } => {
const isPropertyAccessible = (arg: unknown): arg is Record<string, unknown> => {
  return arg != null;
};

const isHrMember = (arg: unknown): arg is HrMember => {
  if (
    !isPropertyAccessible(arg) ||
    !(
      // (
      //   (isPropertyAccessible(arg.hr_constituency) &&
      //     isPropertyAccessible(arg.hr_constituency.prefecture)) ||
      //   isPropertyAccessible(arg.hr_pr_block)
      // )
      (isPropertyAccessible(arg.hr_constituency) || isPropertyAccessible(arg.hr_pr_block))
    )
  )
    return false;

  return (
    typeof arg.id === 'number' &&
    typeof arg.elected_system === 'number' &&
    ((isPropertyAccessible(arg.hr_constituency) &&
      typeof arg.hr_constituency.id === 'number' &&
      typeof arg.hr_constituency.name === 'string' &&
      isPropertyAccessible(arg.hr_constituency.prefecture) &&
      typeof arg.hr_constituency.prefecture.id === 'number' &&
      typeof arg.hr_constituency.prefecture.prefecture === 'string') ||
      (isPropertyAccessible(arg.hr_pr_block) &&
        typeof arg.hr_pr_block.id === 'number' &&
        typeof arg.hr_pr_block.block_name === 'string'))
  );
};

const isPoliticalPartyHrMember = (arg: unknown): arg is PoliticalPartyHrMember => {
  // プロパティアクセス出来ない可能性を排除
  if (
    !isPropertyAccessible(arg) ||
    !isPropertyAccessible(arg.politician) ||
    !isPropertyAccessible(arg.politician.hr_members)
  )
    return false;

  // プロパティにオブジェクト配列を含んでいる場合の判定
  // 配列か否かを判定
  if (!Array.isArray(arg.politician.hr_members)) return false;
  // 全てHrMember型か否かを判定
  if (arg.politician.hr_members.some((v) => !isHrMember(v))) return false;

  return (
    typeof arg.id === 'number' &&
    typeof arg.politician.id === 'number' &&
    typeof arg.politician.last_name_kanji === 'string' &&
    typeof arg.politician.first_name_kanji === 'string' &&
    typeof arg.politician.last_name_kana === 'string' &&
    typeof arg.politician.first_name_kana === 'string'
  );
};

const isHcMember = (arg: unknown): arg is HcMember => {
  if (
    !isPropertyAccessible(arg) // ||
    // (arg.elected_system === 1 && !isPropertyAccessible(arg.hc_constituency))
  )
    return false;

  return (
    typeof arg.id === 'number' &&
    typeof arg.elected_system === 'number' &&
    (isPropertyAccessible(arg.hc_constituency)
      ? typeof arg.hc_constituency.id === 'number' && typeof arg.hc_constituency.name === 'string'
      : arg.elected_system === 2)
  );
};

const isPoliticalPartyHcMember = (arg: unknown): arg is PoliticalPartyHcMember => {
  if (
    !isPropertyAccessible(arg) ||
    !isPropertyAccessible(arg.politician) ||
    !isPropertyAccessible(arg.politician.hc_members)
  )
    return false;

  // プロパティにオブジェクト配列を含んでいる場合の判定
  // 配列か否かを判定
  if (!Array.isArray(arg.politician.hc_members)) return false;
  // 全てHcMember型か否かを判定
  if (arg.politician.hc_members.some((v) => !isHcMember(v))) return false;

  return (
    typeof arg.id === 'number' &&
    typeof arg.politician.id === 'number' &&
    typeof arg.politician.last_name_kanji === 'string' &&
    typeof arg.politician.first_name_kanji === 'string' &&
    typeof arg.politician.last_name_kana === 'string' &&
    typeof arg.politician.first_name_kana === 'string'
  );
};

// 指定した政党の衆議院議員を取得
export const getPoliticalPartyHrMembersData = async (politicalPartyId: string) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/political_party_members/hr_members/${politicalPartyId}`,
  );
  const politicalPartyHrMembersData = await res.data;
  // const res = await fetch(
  //   `${process.env.NEXT_PUBLIC_API_URL}/political_party_members/hr_members/${politicalPartyId}`,
  //   { method: 'GET' },
  // );
  // const politicalPartyHrMembersData = await res.json();
  if (
    Array.isArray(politicalPartyHrMembersData) &&
    politicalPartyHrMembersData.every(isPoliticalPartyHrMember)
  ) {
    return politicalPartyHrMembersData;
  } else {
    throw new Error();
  }
};

// 指定した政党の参議院議員を取得
export const getPoliticalPartyHcMembersData = async (politicalPartyId: string) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/political_party_members/hc_members/${politicalPartyId}`,
  );
  const politicalPartyHcMembersData = await res.data;

  if (
    Array.isArray(politicalPartyHcMembersData) &&
    politicalPartyHcMembersData.every(isPoliticalPartyHcMember)
  ) {
    return politicalPartyHcMembersData;
  } else {
    throw new Error();
  }
};
