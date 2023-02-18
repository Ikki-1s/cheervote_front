import axios from 'axios';
import { parseCookies } from 'nookies';
import { CvPostData, isCvPageData, isCvTerm, isResultForPieChart } from 'domains';
import { setApiBaseUrl, setHeaderToken } from 'utils';

// 支持投票ページ表示用データを取得
export const getCvPageData = async (politicianId: string, cookie?: { [key: string]: string }) => {
  const token = setHeaderToken(cookie);

  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/cheervotes/${politicianId}`, {
    headers: token,
  });

  const cvPageData = await res.data;
  // cheervoteDataは配列に入った形式ではない、オブジェクト単体であるため、
  // isCheervoteData単体でチェックする
  // if (Array.isArray(cheervoteData) && cheervoteData.every(isCheervoteData)) {
  if (isCvPageData(cvPageData)) {
    return cvPageData;
  } else {
    throw new Error();
  }
};

// 指定した政治家の現役の期間分の支持投票期間のリストを取得
export const getActiveCvTermsOfPolitician = async ({ politicianId }: { politicianId: string }) => {
  const apiBaseUrl = setApiBaseUrl();
  const res = await axios.get(`${apiBaseUrl}/cheervotes/terms/active/${politicianId}`);
  const activeCvTermsOfPolitician = res.data;

  if (Array.isArray(activeCvTermsOfPolitician) && activeCvTermsOfPolitician.every(isCvTerm)) {
    return activeCvTermsOfPolitician;
  } else {
    throw new Error();
  }
};

// 支持投票結果の円グラフ表示用データを取得
export const getResultForPieChart = async ({
  politicianId,
  cvQuestionId,
  myConstituencyFlg,
  cvTermId,
}: {
  politicianId: string;
  cvQuestionId: number;
  myConstituencyFlg: number;
  cvTermId?: number;
}) => {
  const apiBaseUrl = setApiBaseUrl();
  let reqUrl: string;
  if (cvTermId) {
    reqUrl = `${apiBaseUrl}/cheervotes/results/pie?politician=${politicianId}&cv_question=${cvQuestionId}&my_constituency_flg=${myConstituencyFlg}&cv_term=${cvTermId}`;
  } else {
    reqUrl = `${apiBaseUrl}/cheervotes/results/pie?politician=${politicianId}&cv_question=${cvQuestionId}&my_constituency_flg=${myConstituencyFlg}`;
  }

  const res = await axios.get(reqUrl);
  const resultForPieChart = res.data;

  if (isResultForPieChart(resultForPieChart)) {
    return resultForPieChart;
  } else {
    throw new Error();
  }
};

// Cheervoteページから議員への評価を投票する
export const postCvEvaluation = (cvPostData: CvPostData) => {
  const apiBaseUrl = setApiBaseUrl();

  // 評価対象議員が衆議院議員か参議院議員かでアクセスURLを変更
  let reqUrl: string;
  if (cvPostData.which_house === 'hc') {
    reqUrl = `${apiBaseUrl}/hc_cvs`;
  } else if (cvPostData.which_house === 'hr') {
    reqUrl = `${apiBaseUrl}/hr_cvs`;
  } else {
    throw new Error();
  }

  return axios.post(reqUrl, cvPostData, {
    headers: {
      'access-token': parseCookies()._access_token,
      client: parseCookies()._client,
      uid: parseCookies()._uid,
    },
  });
};
