import { GetServerSidePropsContext } from 'next';
import axios from 'axios';
import { parseCookies } from 'nookies';
import { SigninParams, SignupParams, User, isUser } from 'domains';
import { checkAndGetAccessToken, setApiBaseUrl, setHeaderToken } from 'utils';

// const clientSideBaseUrl = `${process.env.NEXT_PUBLIC_CLIENT_SIDE_API_URL}/auth/`;
// const serverSideBaseUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/`;

// サインアップ（新規ユーザー登録）
export const signup = (params: SignupParams) => {
  const {
    name,
    email,
    password,
    passwordConfirmation,
    hrConstituency,
    hcConstituency,
    prefecture,
  } = params;

  return axios.post(setApiBaseUrl() + '/auth', {
    name: name,
    email: email,
    password: password,
    password_confirmation: passwordConfirmation,
    hr_constituency_id: hrConstituency,
    hc_constituency_id: hcConstituency,
    prefecture_id: prefecture,
    confirm_success_url: process.env.NEXT_PUBLIC_CL_LOGIN_PAGE_URL,
  });
};

// サインイン（ログイン）
export const signin = (params: SigninParams) => {
  const { email, password } = params;

  return axios.post(setApiBaseUrl() + '/auth/sign_in', {
    email: email,
    password: password,
  });
};

// ゲストサインイン
export const guestSignin = () => {
  return axios.post(setApiBaseUrl() + '/auth/guests/sign_in');
};

// サインアウト（ログアウト）
export const signout = () => {
  const token = setHeaderToken(parseCookies());
  return axios.delete(setApiBaseUrl() + '/auth/sign_out', {
    headers: token,
  });
};

// ユーザー（アカウント）削除
export const deleteUser = () => {
  const token = checkAndGetAccessToken();
  // アクセストークン有無チェック
  if (!token) return;

  return axios.delete(setApiBaseUrl() + '/auth/', { headers: token });
};

// 認証済みのユーザーを取得
export const getCurrentUser = async (
  context?: GetServerSidePropsContext,
): Promise<User | undefined> => {
  const token = checkAndGetAccessToken();
  // アクセストークン有無チェック
  if (!token) return;

  const res = await axios.get(setApiBaseUrl() + '/auth/sessions', {
    headers: token,
  });
  const currentUserData = await res.data;

  if (isUser(currentUserData)) {
    return currentUserData;
  } else {
    throw new Error();
  }
};
