export type PoliticalParty = {
  id: number;
  name_kanji: string;
  name_kana?: string;
  abbreviation_kanji?: string;
  abbreviation_kana?: string;
};

export type PoliticalPartyHavingActiveMember = {
  id: number;
  name: string;
};

export type PoliticalPartyOfPolitician = {
  political_party: {
    name_kanji: string;
    abbreviation_kanji: string;
  };
};
