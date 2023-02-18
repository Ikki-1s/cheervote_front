import { isPropertyAccessible } from 'domains';

// 参議院選挙回
export type HcElectionTime = {
  id: number;
  election_time: number;
  announcement_date: string;
  election_date: string;
  expiration_date: string | null;
};

export const isHcElectionTime = (arg: unknown): arg is HcElectionTime => {
  if (!isPropertyAccessible(arg)) return false;
  return (
    typeof arg.id === 'number' &&
    typeof arg.election_time === 'number' &&
    typeof arg.announcement_date === 'string' &&
    typeof arg.election_date === 'string' &&
    (typeof arg.expiration_date === 'string' || arg.expiration_date === null)
  );
};
