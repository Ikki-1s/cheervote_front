import { isPropertyAccessible } from 'domains';

// 衆議院選挙回
export type HrElectionTime = {
  id: number;
  election_time: number;
  announcement_date: string;
  election_date: string;
  expiration_date: string | null;
  dissolution_date: string | null;
};

export const isHrElectionTime = (arg: unknown): arg is HrElectionTime => {
  if (!isPropertyAccessible(arg)) return false;
  return (
    typeof arg.id === 'number' &&
    typeof arg.election_time === 'number' &&
    typeof arg.announcement_date === 'string' &&
    typeof arg.election_date === 'string' &&
    (typeof arg.expiration_date === 'string' || arg.expiration_date === null) &&
    (typeof arg.dissolution_date === 'string' || arg.dissolution_date === null)
  );
};
