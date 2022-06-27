import { PoliticalPartyOfPolitician } from './politicalParty';

export type Politician = {
  id: number;
  last_name_kanji: string;
  first_name_kanji: string;
  last_name_kana: string;
  first_name_kana: string;
  political_party_members: PoliticalPartyOfPolitician[];
};
