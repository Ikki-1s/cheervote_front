import { AxiosResponse } from 'axios';
import { destroyCookie, setCookie } from 'nookies';

// Client-only Cookies
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
