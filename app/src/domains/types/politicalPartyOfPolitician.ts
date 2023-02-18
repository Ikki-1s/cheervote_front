import { isPropertyAccessible, PoliticalParty } from 'domains';

// 政治家所属政党
export type PoliticalPartyOfPolitician = {
  political_party: PoliticalParty;
  // political_party: {
  //   name_kanji: string;
  //   abbreviation_kanji: string;
  // };
};

export const isPoliticalPartyOfPolitician = (arg: unknown): arg is PoliticalPartyOfPolitician => {
  if (!isPropertyAccessible(arg) || !isPropertyAccessible(arg.political_party)) return false;
  return (
    typeof arg.political_party.name_kanji === 'string' &&
    typeof arg.political_party.abbreviation_kanji === 'string'
  );
};
