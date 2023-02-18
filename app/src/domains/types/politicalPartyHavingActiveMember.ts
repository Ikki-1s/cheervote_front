import { isPropertyAccessible } from 'domains';

// 現役国会議員のいる政党
export type PoliticalPartyHavingActiveMember = {
  id: number;
  name_kanji: string;
  name_kana: string;
  total: number;
  hr_count: number;
  hc_count: number;
};

export const isPoliticalPartyHavingActiveMember = (
  arg: unknown,
): arg is PoliticalPartyHavingActiveMember => {
  if (!isPropertyAccessible(arg)) return false; // プロパティアクセス出来ない可能性を排除
  return (
    typeof arg.id === 'number' &&
    typeof arg.name_kanji === 'string' &&
    typeof arg.name_kana === 'string' &&
    typeof arg.total === 'number' &&
    typeof arg.hr_count === 'number' &&
    typeof arg.hc_count === 'number'
  );
};
