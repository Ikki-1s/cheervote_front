import { isPropertyAccessible } from 'domains';

// ユーザー
export type User = {
  id: number;
  provider: string;
  uid: string;
  allow_password_change: boolean;
  name: string;
  nickname: string | null;
  image: string | null;
  email: string;
  // created_at: Date;
  created_at: string;
  // updated_at: Date;
  updated_at: string;
  hr_constituency_id: number;
  hc_constituency_id: number;
  prefecture_id: number;
};

export const isUser = (arg: unknown): arg is User => {
  if (!isPropertyAccessible(arg)) return false;
  return (
    typeof arg.id === 'number' &&
    typeof arg.provider === 'string' &&
    typeof arg.uid === 'string' &&
    typeof arg.allow_password_change === 'boolean' &&
    typeof arg.name === 'string' &&
    (typeof arg.nickname === 'string' || arg.nickname === null) &&
    (typeof arg.image === 'string' || arg.image === null) &&
    typeof arg.email === 'string' &&
    typeof arg.created_at === 'string' &&
    typeof arg.updated_at === 'string' &&
    typeof arg.hr_constituency_id === 'number' &&
    typeof arg.hc_constituency_id === 'number' &&
    typeof arg.prefecture_id === 'number'
  );
};
