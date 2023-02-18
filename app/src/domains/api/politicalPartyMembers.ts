import axios from 'axios';
import { isPoliticalPartyHcMember, isPoliticalPartyHrMember } from 'domains';

// 指定した政党の衆議院議員を取得
export const getPoliticalPartyHrMembers = async (politicalPartyId: string) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/political_party_members/hr_members/${politicalPartyId}`,
  );
  const politicalPartyHrMembers = await res.data;
  if (
    Array.isArray(politicalPartyHrMembers) &&
    // politicalPartyHrMembers.length &&
    politicalPartyHrMembers.every(isPoliticalPartyHrMember)
  ) {
    return politicalPartyHrMembers;
  } else {
    throw new Error();
  }
};

// 指定した政党の参議院議員を取得
export const getPoliticalPartyHcMembers = async (politicalPartyId: string) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/political_party_members/hc_members/${politicalPartyId}`,
  );
  const politicalPartyHcMembers = await res.data;

  if (
    Array.isArray(politicalPartyHcMembers) &&
    // politicalPartyHcMembers.length &&
    politicalPartyHcMembers.every(isPoliticalPartyHcMember)
  ) {
    return politicalPartyHcMembers;
  } else {
    throw new Error();
  }
};
