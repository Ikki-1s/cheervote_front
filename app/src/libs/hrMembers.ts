import fetch from 'node-fetch';

import { HrMemberOfPrefecture, HrMemberOfHrPrBlock } from '../types/hrMember';
import { PoliticalPartyOfPolitician } from '../types/politicalParty';

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

const isHrMemberOfPrefecture = (arg: unknown): arg is HrMemberOfPrefecture => {
  // プロパティアクセス出来ない可能性を排除
  if (
    !isPropertyAccessible(arg) ||
    !isPropertyAccessible(arg.hr_constituency) ||
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
    typeof arg.hr_constituency.id === 'number' &&
    typeof arg.hr_constituency.name === 'string' &&
    typeof arg.politician.id === 'number' &&
    typeof arg.politician.last_name_kanji === 'string' &&
    typeof arg.politician.first_name_kanji === 'string' &&
    typeof arg.politician.last_name_kana === 'string' &&
    typeof arg.politician.first_name_kana === 'string'
  );
};

const isHrMemberOfHrPrBlock = (arg: unknown): arg is HrMemberOfHrPrBlock => {
  // プロパティアクセス出来ない可能性を排除
  if (
    !isPropertyAccessible(arg) ||
    !isPropertyAccessible(arg.hr_pr_block) ||
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
    typeof arg.hr_pr_block.id === 'number' &&
    typeof arg.hr_pr_block.block_name === 'string' &&
    typeof arg.hr_pr_block.quota === 'number' &&
    typeof arg.politician.id === 'number' &&
    typeof arg.politician.last_name_kanji === 'string' &&
    typeof arg.politician.first_name_kanji === 'string' &&
    typeof arg.politician.last_name_kana === 'string' &&
    typeof arg.politician.first_name_kana === 'string'
  );
};

// 都道府県ごとの小選挙区選出衆議院議員を取得
export const getHrMembersOfPrefectureData = async (prefectureId: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/hr_members/prefectures/${prefectureId}`,
    {
      method: 'GET',
    },
  );
  const hrMembersOfPrefectureData = await res.json();
  if (
    Array.isArray(hrMembersOfPrefectureData) &&
    hrMembersOfPrefectureData.every(isHrMemberOfPrefecture)
  ) {
    return hrMembersOfPrefectureData;
  } else {
    throw new Error();
  }
};

// 比例代表ブロックごとの比例代表ブロック選出衆議院議員を取得
export const getHrMembersOfHrPrBlockData = async (hrPrBlockId: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/hr_members/hr_pr_blocks/${hrPrBlockId}`,
    {
      method: 'GET',
    },
  );
  const hrMembersOfHrPrBlockData = await res.json();
  if (
    Array.isArray(hrMembersOfHrPrBlockData) &&
    hrMembersOfHrPrBlockData.every(isHrMemberOfHrPrBlock)
  ) {
    return hrMembersOfHrPrBlockData;
  } else {
    throw new Error();
  }
};
