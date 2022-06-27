import { Politician } from './politician';

export type HrMemberOfPrefecture = {
  id: number;
  hr_constituency: {
    id: number;
    name: string;
  };
  politician: Politician;
};

export type HrMemberOfHrPrBlock = {
  id: number;
  hr_pr_block: {
    id: number;
    block_name: string;
    quota: number;
  };
  politician: Politician;
};
