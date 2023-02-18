import axios from 'axios';
import { isHrMemberOfPrefecture, isHrMemberOfPrBlock } from 'domains';

// 都道府県ごとの小選挙区選出衆議院議員を取得
export const getHrMembersOfPrefecture = async (prefectureId: string) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/hr_members/prefectures/${prefectureId}`,
  );
  const hrMembersOfPrefecture = await res.data;
  if (
    Array.isArray(hrMembersOfPrefecture) &&
    hrMembersOfPrefecture.length &&
    hrMembersOfPrefecture.every(isHrMemberOfPrefecture)
  ) {
    return hrMembersOfPrefecture;
  } else {
    throw new Error();
  }
};

// 比例代表ブロックごとの比例代表ブロック選出衆議院議員を取得
export const getHrMembersOfPrBlock = async (hrPrBlockId: string) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/hr_members/hr_pr_blocks/${hrPrBlockId}`,
  );
  const hrMembersOfPrBlock = await res.data;
  if (
    Array.isArray(hrMembersOfPrBlock) &&
    hrMembersOfPrBlock.length &&
    hrMembersOfPrBlock.every(isHrMemberOfPrBlock)
  ) {
    return hrMembersOfPrBlock;
  } else {
    throw new Error();
  }
};
