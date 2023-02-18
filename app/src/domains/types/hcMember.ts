import { isPropertyAccessible } from 'domains';

// 参議院議員
export type HcMember = {
  id: number;
  politician_id: number;
  hc_election_time_id: number;
  elected_system: number;
  hc_constituency_id: number | null;
  mid_term_start_date: string | null;
  mid_term_start_reason: string | null;
  mid_term_end_date: string | null;
  mid_term_end_reason: string | null;
};

export const isHcMember = (arg: unknown): arg is HcMember => {
  if (!isPropertyAccessible(arg)) return false;
  return (
    typeof arg.id === 'number' &&
    typeof arg.politician_id === 'number' &&
    typeof arg.hc_election_time_id === 'number' &&
    typeof arg.elected_system === 'number' &&
    ('hc_constituency_id' in arg
      ? typeof arg.hc_constituency_id === 'number' || arg.hc_constituency_id === null
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
