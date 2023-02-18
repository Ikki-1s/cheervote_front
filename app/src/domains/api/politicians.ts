import axios from 'axios';
import { isPolitician, isPoliticianWithAssociateData } from 'domains';

export const getAllPoliticiansIds = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/politicians`);
  const allPoliticiansData = await res.data;

  if (
    Array.isArray(allPoliticiansData) &&
    allPoliticiansData.length &&
    allPoliticiansData.every(isPolitician)
  ) {
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
    Array.isArray(politicianWithAssociateData) && // 配列であるかのチェック
    politicianWithAssociateData.length && // 空配列でないかのチェック
    politicianWithAssociateData.every(isPoliticianWithAssociateData)
  ) {
    return politicianWithAssociateData;
  } else {
    throw new Error();
  }
};
