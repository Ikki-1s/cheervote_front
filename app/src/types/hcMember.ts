import { HcConstituency } from 'types/hcConstituency';
import { Politician } from 'types/politician';

export type HcMemberOfHcConstituency = {
  id: number;
  hc_constituency: HcConstituency;
  hc_election_time: {
    id: number;
    election_time: number;
    expiration_date: string;
  };
  politician: Politician;
};

export type HcMemberOfHcPr = {
  id: number;
  hc_election_time: {
    id: number;
    election_time: number;
    expiration_date: string;
  };
  politician: Politician;
};
