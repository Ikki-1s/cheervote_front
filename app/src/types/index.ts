// サインアップ
export type SignUpParams = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  hr_constituency_id: number;
  hc_constituency_id: number;
  prefecture_id: number;
};

// サインイン
export type SignInParams = {
  email: string;
  password: string;
};

// ユーザー
export type User = {
  id: number;
  provider: string;
  uid: string;
  allow_password_change: boolean;
  name: string;
  nickname?: string;
  image?: string;
  email: string;
  created_at: Date;
  updated_at: Date;
  hr_constituency_id: number;
  hc_constituency_id: number;
  prefecture_id: number;
};
