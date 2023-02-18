import { isPropertyAccessible } from 'domains';

// 衆議院議員
export type HrMember = {
  id: number;
  politician_id: number;
  hr_election_time_id: number;
  elected_system: number;
  hr_constituency_id: number | null;
  hr_pr_block_id: number | null;
  mid_term_start_date: string | null;
  mid_term_start_reason: string | null;
  mid_term_end_date: string | null;
  mid_term_end_reason: string | null;
};

export const isHrMember = (arg: unknown): arg is HrMember => {
  if (!isPropertyAccessible(arg)) return false;
  return (
    typeof arg.id === 'number' &&
    typeof arg.politician_id === 'number' &&
    typeof arg.hr_election_time_id === 'number' &&
    typeof arg.elected_system === 'number' &&
    ('hr_constituency_id' in arg
      ? typeof arg.hr_constituency_id === 'number' || arg.hr_constituency_id === null
      : true) &&
    ('hr_pr_block_id' in arg
      ? typeof arg.hr_pr_block_id === 'number' || arg.hr_pr_block_id === null
      : true) &&
    ('mid_term_start_date' in arg
      ? typeof arg.mid_term_start_date === 'string' || arg.mid_term_start_date === null
      : true) &&
    ('mid_term_start_reason' in arg
      ? typeof arg.mid_term_start_reason === 'string' || arg.mid_term_start_reason === null
      : true) &&
    ('mid_term_end_date' in arg
      ? typeof arg.mid_term_end_date === 'string' || arg.mid_term_end_date === null
      : true) &&
    ('mid_term_end_reason' in arg
      ? typeof arg.mid_term_end_reason === 'string' || arg.mid_term_end_reason === null
      : true)
  );
};
