import axios from 'axios';
import { isHcMemberOfConstituency, isHcMemberOfPr } from 'domains';

// 選挙区ごとの参議院議員
export const getHcMembersOfConstituency = async (hcConstituencyId: string) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/hc_members/hc_constituencies/${hcConstituencyId}`,
  );
  const hcMembersOfConstituency = await res.data;
  if (
    Array.isArray(hcMembersOfConstituency) &&
    hcMembersOfConstituency.every(isHcMemberOfConstituency)
  ) {
    return hcMembersOfConstituency;
  } else {
    throw new Error();
  }
};

// 全国比例選出参議院議員
export const getHcMembersOfPr = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/hc_members/hc_pr`);
  const hcMembersOfPr = await res.data;
  if (Array.isArray(hcMembersOfPr) && hcMembersOfPr.every(isHcMemberOfPr)) {
    return hcMembersOfPr;
  } else {
    throw new Error();
  }
};
