import axios from 'axios';
import { parseCookies } from 'nookies';

import { SignInParams, SignUpParams } from 'types';

const clientSideBaseUrl = 'http://localhost:3000/api/v1/auth/';

// サインアップ（新規ユーザー登録）
export const signUp = (params: SignUpParams) => {
  const {
    name,
    email,
    password,
    password_confirmation,
    hr_constituency_id,
    hc_constituency_id,
    prefecture_id,
  } = params;

  return axios.post(clientSideBaseUrl, {
    name: name,
    email: email,
    password: password,
    password_confirmation: password_confirmation,
    hr_constituency_id: hr_constituency_id,
    hc_constituency_id: hc_constituency_id,
    prefecture_id: prefecture_id,
  });
};

// サインイン（ログイン）
export const signIn = (params: SignInParams) => {
  const { email, password } = params;

  return axios.post(clientSideBaseUrl + 'sign_in', {
    email: email,
    password: password,
  });
};

// サインアウト（ログアウト）
export const signOut = () => {
  return axios.delete(clientSideBaseUrl + 'sign_out', {
    headers: {
      'access-token': parseCookies()._access_token,
      client: parseCookies()._client,
      uid: parseCookies()._uid,
    },
  });
};

// 認証済みのユーザーを取得
export const getCurrentUser = () => {
  const cookie = parseCookies();
  if (!cookie._access_token || !cookie._client || !cookie._uid) return;
  return axios.get(clientSideBaseUrl + 'sessions', {
    headers: {
      'access-token': cookie._access_token,
      client: cookie._client,
      uid: cookie._uid,
    },
  });
};
