import axios from 'axios';

import { HrPrBlock } from 'types';

// ユーザー定義型ガード
const isPropertyAccessible = (arg: unknown): arg is Record<string, unknown> => {
  return arg != null;
};

const isHrPrBlock = (arg: unknown): arg is HrPrBlock => {
  // プロパティアクセスできない可能性を排除
  if (!isPropertyAccessible(arg)) return false;
  return (
    typeof arg.id === 'number' &&
    typeof arg.block_name === 'string' &&
    typeof arg.quota === 'number'
  );
};

export const getAllHrPrBlocksData = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/hr_pr_blocks`);
  const allHrPrBlocksData = await res.data;
  if (Array.isArray(allHrPrBlocksData) && allHrPrBlocksData.every(isHrPrBlock)) {
    return allHrPrBlocksData;
  } else {
    throw new Error();
  }
};

export const getAllHrPrBlocksIds = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/hr_pr_blocks`);
  const allHrPrBlocksData = await res.data;

  if (Array.isArray(allHrPrBlocksData) && allHrPrBlocksData.every(isHrPrBlock)) {
    return allHrPrBlocksData.map((hrPrBlockData) => {
      return {
        params: {
          id: hrPrBlockData.id.toString(),
        },
      };
    });
  } else {
    throw new Error();
  }
};

export const getHrPrBlockName = async (hrPrBlockId: string) => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/hr_pr_blocks/${hrPrBlockId}`);
  const hrPrBlockData = await res.data;

  if (Array.isArray(hrPrBlockData) && hrPrBlockData.every(isHrPrBlock)) {
    const hrPrBlockName = hrPrBlockData[0].block_name;
    return hrPrBlockName;
  } else {
    throw new Error();
  }
};
