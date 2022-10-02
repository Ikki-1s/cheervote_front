import axios from 'axios';
import { parseCookies } from 'nookies';
import { CheervotePostData } from 'types';
import { setApiBaseUrl } from './common/environments';
import { isCheervoteData } from './common/userDefinedTypeGuards';
import { setHeaderToken } from './cookie';

export const getCheervoteData = async (
  politician_id: string,
  cookie?: { [key: string]: string },
) => {
  const token = setHeaderToken(cookie);

  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/cheervotes/${politician_id}`, {
    headers: token,
  });

  const cheervoteData = await res.data;
  // cheervoteDataは配列に入った形式ではない、オブジェクト単体であるため、
  // isCheervoteData単体でチェックする
  // if (Array.isArray(cheervoteData) && cheervoteData.every(isCheervoteData)) {
  if (isCheervoteData(cheervoteData)) {
    return cheervoteData;
  } else {
    throw new Error();
  }
};

// Cheervoteページから議員への評価を投票する
export const postCheervoteEvaluation = (cheervotePostData: CheervotePostData) => {
  // ここではHooks（useContext）は使えない
  // const { cheervotePostData } = useContext(CheervotePostDataContext);

  const apiBaseUrl = setApiBaseUrl();

  // console.log(cheervotePostData);
  // console.log(apiBaseUrl);

  // 評価対象議員が衆議院議員か参議院議員かでアクセスURLを変更
  let reqUrl: string;
  if (cheervotePostData.which_house === 'hc') {
    reqUrl = `${apiBaseUrl}/hc_cvs`;
  } else if (cheervotePostData.which_house === 'hr') {
    reqUrl = `${apiBaseUrl}/hr_cvs`;
  } else {
    throw new Error();
  }

  return axios.post(reqUrl, cheervotePostData, {
    headers: {
      'access-token': parseCookies()._access_token,
      client: parseCookies()._client,
      uid: parseCookies()._uid,
    },
  });
};
