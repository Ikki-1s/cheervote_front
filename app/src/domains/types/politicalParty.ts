import { isPropertyAccessible } from 'domains';

// 政党
export type PoliticalParty = {
  id: number;
  name_kanji: string;
  name_kana?: string;
  abbreviation_kanji?: string;
  abbreviation_kana?: string | null;
};

export const isPoliticalParty = (arg: unknown): arg is PoliticalParty => {
  if (!isPropertyAccessible(arg)) return false;
  return (
    typeof arg.id === 'number' &&
    typeof arg.name_kanji === 'string' &&
    ('name_kana' in arg ? typeof arg.name_kana === 'string' : true) &&
    ('abbreviation_kanji' in arg ? typeof arg.abbreviation_kanji === 'string' : true) &&
    ('abbreviation_kana' in arg
      ? typeof arg.abbreviation_kana === 'string' || arg.abbreviation_kana === null
      : true)
  );
};
