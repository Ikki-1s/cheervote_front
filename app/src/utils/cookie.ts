import { AxiosResponse } from 'axios';
import { isPropertyAccessible } from 'domains';
import { destroyCookie, setCookie } from 'nookies';

// Client-only Cookies
// signup()のレスポンスをそのまま引数にセットする
export const setClientSideCookie = (res: AxiosResponse) => {
  // 秒で有効期間を設定 [何日 ✕ 1日(24時間) ✕ 1時間(60分) ✕ 1分(60秒)]
  const setCookieOptions = { maxAge: 14 * 24 * 60 * 60, path: '/' };

  setCookie(null, '_access_token', res.headers['access-token'], setCookieOptions);
  setCookie(null, '_client', res.headers['client'], setCookieOptions);
  setCookie(null, '_uid', res.headers['uid'], setCookieOptions);
};

export const destroyClientSideCookie = () => {
  destroyCookie(null, '_access_token');
  destroyCookie(null, '_client');
  destroyCookie(null, '_uid');
};

// リクエストヘッダーに付加するアクセストークンのオブジェクトをCookieから作成
export const setHeaderToken = (cookie?: { [key: string]: string }) => {
  const token = {
    'access-token': '',
    client: '',
    uid: '',
  };

  if (
    isPropertyAccessible(cookie) &&
    '_access_token' in cookie &&
    '_client' in cookie &&
    '_uid' in cookie
  ) {
    token['access-token'] = cookie._access_token;
    token['client'] = cookie._client;
    token['uid'] = cookie._uid;
  }

  return token;
};
