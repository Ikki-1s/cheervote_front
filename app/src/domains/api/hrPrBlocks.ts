import axios from 'axios';
import { isHrPrBlock } from 'domains';

//// 今後使うかもしれないので一応残しておく ////
// export const getAllHrPrBlocks = async () => {
//   const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/hr_pr_blocks`);
//   const allHrPrBlocks = await res.data;
//   if (Array.isArray(allHrPrBlocks) && allHrPrBlocks.every(isHrPrBlock)) {
//     return allHrPrBlocks;
//   } else {
//     throw new Error();
//   }
// };

export const getAllHrPrBlocksIds = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/hr_pr_blocks`);
  const allHrPrBlocks = await res.data;

  if (Array.isArray(allHrPrBlocks) && allHrPrBlocks.length && allHrPrBlocks.every(isHrPrBlock)) {
    return allHrPrBlocks.map((hrPrBlock) => {
      return {
        params: {
          id: hrPrBlock.id.toString(),
        },
      };
    });
  } else {
    throw new Error();
  }
};

export const getHrPrBlock = async (hrPrBlockId: string) => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/hr_pr_blocks/${hrPrBlockId}`);
  const hrPrBlock = await res.data;

  if (Array.isArray(hrPrBlock) && hrPrBlock.length && hrPrBlock.every(isHrPrBlock)) {
    return hrPrBlock[0];
  } else {
    throw new Error();
  }
};
