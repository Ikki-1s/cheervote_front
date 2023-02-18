import { isPropertyAccessible } from 'domains';

// 政治家
export type Politician = {
  id: number;
  last_name_kanji: string;
  first_name_kanji: string | null;
  last_name_kana: string;
  first_name_kana: string | null;
  image?: string | null;
  birthday?: string | null;
  career?: string | null;
  website?: string | null;
  twitter?: string | null;
  youtube?: string | null;
  facebook?: string | null;
  instagram?: string | null;
  line?: string | null;
  other_sns?: string | null;
};

export const isPolitician = (arg: unknown): arg is Politician => {
  if (!isPropertyAccessible(arg)) return false;
  return (
    typeof arg.id === 'number' &&
    typeof arg.last_name_kanji === 'string' &&
    (typeof arg.first_name_kanji === 'string' || arg.first_name_kanji === null) &&
    typeof arg.last_name_kana === 'string' &&
    (typeof arg.first_name_kana === 'string' || arg.first_name_kana === null) &&
    ('image' in arg ? typeof arg.image === 'string' || arg.image === null : true) &&
    ('birthday' in arg ? typeof arg.image === 'string' || arg.image === null : true) &&
    ('career' in arg ? typeof arg.career === 'string' || arg.career === null : true) &&
    ('website' in arg ? typeof arg.website === 'string' || arg.website === null : true) &&
    ('twitter' in arg ? typeof arg.twitter === 'string' || arg.twitter === null : true) &&
    ('youtube' in arg ? typeof arg.youtube === 'string' || arg.youtube === null : true) &&
    ('facebook' in arg ? typeof arg.facebook === 'string' || arg.facebook === null : true) &&
    ('instagram' in arg ? typeof arg.facebook === 'string' || arg.facebook === null : true) &&
    ('line' in arg ? typeof arg.facebook === 'string' || arg.facebook === null : true) &&
    ('other_sns' in arg ? typeof arg.other_sns === 'string' || arg.other_sns === null : true)
  );
};
