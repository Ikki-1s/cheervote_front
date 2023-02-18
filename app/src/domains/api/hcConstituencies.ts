import axios from 'axios';
import { isHcConstituency } from 'domains';

//// 今後使うかもしれないので一応残しておく ////
// export const getAllHcConstituencies = async () => {
//   const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/hc_constituencies`);
//   const allHcConstituencies = await res.data;
//
//   if (Array.isArray(allHcConstituencies) && allHcConstituencies.every(isHcConstituency)) {
//     return allHcConstituencies;
//   } else {
//     throw new Error();
//   }
// };

export const getAllHcConstituenciesIds = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/hc_constituencies`);
  const allHcConstituency = await res.data;

  if (
    Array.isArray(allHcConstituency) &&
    allHcConstituency.length &&
    allHcConstituency.every(isHcConstituency)
  ) {
    return allHcConstituency.map((hcConstituency) => {
      return {
        params: {
          id: hcConstituency.id.toString(),
        },
      };
    });
  } else {
    throw new Error();
  }
};

export const getHcConstituency = async (hcConctituencyId: string) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/hc_constituencies/${hcConctituencyId}`,
  );
  const hcConstituency = await res.data;

  if (
    Array.isArray(hcConstituency) &&
    hcConstituency.length &&
    hcConstituency.every(isHcConstituency)
  ) {
    return hcConstituency[0];
  } else {
    throw new Error();
  }
};
