import axios from 'axios';
import { GetServerSidePropsContext, NextPageContext } from 'next';
import { parseCookies } from 'nookies';

import { SignInParams, SignUpParams } from 'types';
import { isCurrentUser } from './common/userDefinedTypeGuards';

// const clientSideBaseUrl = 'http://localhost:3000/api/v1/auth/';
const clientSideBaseUrl = `${process.env.NEXT_PUBLIC_CLIENT_SIDE_API_URL}/auth/`;
const serverSideBaseUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/`;

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
export const getCurrentUser = async (context?: GetServerSidePropsContext) => {
  const cookie = parseCookies(context);
  if (!cookie._access_token || !cookie._client || !cookie._uid) return;

  let reqUrl: string;
  // クライアントサイド実行かサーバーサイド実行か判定
  if (typeof window !== 'undefined') {
    // クライアントサイドからアクセス時のURLをセット
    reqUrl = clientSideBaseUrl;
  } else {
    // サーバーサイドからアクセス時のURLをセット
    reqUrl = serverSideBaseUrl;
  }

  const res = await axios.get(reqUrl + 'sessions', {
    headers: {
      'access-token': cookie._access_token,
      client: cookie._client,
      uid: cookie._uid,
    },
  });
  const currentUserData = await res.data;

  if (isCurrentUser(currentUserData)) {
    return currentUserData;
  } else {
    throw new Error();
  }
};
