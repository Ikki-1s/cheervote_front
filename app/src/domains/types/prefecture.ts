import { isPropertyAccessible } from 'domains';

// 都道府県
export type Prefecture = {
  id: number;
  prefecture: string;
};

export const isPrefecture = (arg: unknown): arg is Prefecture => {
  if (!isPropertyAccessible(arg)) return false;
  return typeof arg.id === 'number' && typeof arg.prefecture === 'string';
};
