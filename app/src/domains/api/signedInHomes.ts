import axios from 'axios';
import { isSignedInHome, SignedInHome } from 'domains';
import { GetServerSidePropsContext } from 'next';
import { parseCookies } from 'nookies';
import { setApiBaseUrl, setHeaderToken } from 'utils';

// ログイン後のCHEERVOTE TOPページ表示用データを取得
export const getSignedInHomesData = async (
  context?: GetServerSidePropsContext,
): Promise<SignedInHome | undefined> => {
  const cookie = parseCookies();
  if (!cookie._access_token || !cookie._client || !cookie._uid) return;

  const res = await axios.get(`${setApiBaseUrl()}/signed_in_homes`, {
    headers: setHeaderToken(cookie),
  });
  const signedInHomesData = await res.data;

  // レスポンスがnullの場合return
  if (!signedInHomesData) return;

  if (isSignedInHome(signedInHomesData)) {
    return signedInHomesData;
  } else {
    throw new Error();
  }
};
