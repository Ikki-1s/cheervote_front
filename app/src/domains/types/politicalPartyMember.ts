// import { isPoliticalParty, PoliticalParty } from './politicalParty';
import { isPoliticalParty, isPropertyAccessible, PoliticalParty } from 'domains';

// 政治家所属政党（政党含む）
export type PoliticalPartyMember = {
  id: number;
  politician_id: number;
  political_party_id: number;
  start_belonging_date: string | null;
  end_belonging_date: string | null;
  political_party: PoliticalParty;
};

export const isPoliticalPartyMember = (arg: unknown): arg is PoliticalPartyMember => {
  if (!isPropertyAccessible(arg) || !isPropertyAccessible(arg.political_party)) return false;

  if (!isPoliticalParty(arg.political_party)) return false;

  return (
    typeof arg.id === 'number' &&
    typeof arg.politician_id === 'number' &&
    typeof arg.political_party_id === 'number' &&
    (typeof arg.start_belonging_date === 'string' || arg.start_belonging_date === null) &&
    (typeof arg.end_belonging_date === 'string' || arg.end_belonging_date === null)
  );
};
