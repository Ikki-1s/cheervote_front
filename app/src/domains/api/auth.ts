import { GetServerSidePropsContext } from 'next';
import axios from 'axios';
import { parseCookies } from 'nookies';
import { SigninParams, SignupParams, User, isUser } from 'domains';
import { setHeaderToken } from 'utils';

const clientSideBaseUrl = `${process.env.NEXT_PUBLIC_CLIENT_SIDE_API_URL}/auth/`;
const serverSideBaseUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/`;

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

  return axios.post(clientSideBaseUrl, {
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

  return axios.post(clientSideBaseUrl + 'sign_in', {
    email: email,
    password: password,
  });
};

// ゲストサインイン
export const guestSignin = () => {
  return axios.post(clientSideBaseUrl + 'guests/sign_in');
};

// サインアウト（ログアウト）
export const signout = () => {
  return axios.delete(clientSideBaseUrl + 'sign_out', {
    headers: {
      'access-token': parseCookies()._access_token,
      client: parseCookies()._client,
      uid: parseCookies()._uid,
    },
  });
};

// 認証済みのユーザーを取得
export const getCurrentUser = async (
  context?: GetServerSidePropsContext,
): Promise<User | undefined> => {
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

  // const res = await axios.get(reqUrl + 'sessions', {
  //   headers: {
  //     'access-token': cookie._access_token,
  //     client: cookie._client,
  //     uid: cookie._uid,
  //   },
  // });
  const res = await axios.get(reqUrl + 'sessions', { headers: setHeaderToken(cookie) });
  const currentUserData = await res.data;

  if (isUser(currentUserData)) {
    return currentUserData;
  } else {
    throw new Error();
  }
};

// // 認証済みのユーザーを取得
// export const getCurrentUser = async (context?: GetServerSidePropsContext) => {
//   const cookie = parseCookies(context);
//   if (!cookie._access_token || !cookie._client || !cookie._uid) return;

//   let reqUrl: string;
//   // クライアントサイド実行かサーバーサイド実行か判定
//   if (typeof window !== 'undefined') {
//     // クライアントサイドからアクセス時のURLをセット
//     reqUrl = clientSideBaseUrl;
//   } else {
//     // サーバーサイドからアクセス時のURLをセット
//     reqUrl = serverSideBaseUrl;
//   }

//   const res = await axios.get(reqUrl + 'sessions', {
//     headers: {
//       'access-token': cookie._access_token,
//       client: cookie._client,
//       uid: cookie._uid,
//     },
//   });
//   const currentUserData = await res.data;

//   if (isCurrentUser(currentUserData)) {
//     return currentUserData;
//   } else {
//     throw new Error();
//   }
// };
