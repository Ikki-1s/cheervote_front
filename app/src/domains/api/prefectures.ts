import axios from 'axios';
import { isPrefecture, isPrefWithAllConstituenciesAndBlocks } from 'domains';
import { setApiBaseUrl } from 'utils';

//// 今後使うかもしれないので一応残しておく ////
// export const getAllPrefectures = async () => {
//   const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/prefectures`);
//   const allPrefecturesData = await res.data;

//   if (Array.isArray(allPrefecturesData) && allPrefecturesData.every(isPrefecture)) {
//     return allPrefecturesData;
//   } else {
//     // 型ガード後のelseどうしようか。とりあえずError投げとく
//     throw new Error();
//   }
// };

export const getAllPrefecturesIds = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/prefectures`);
  const allPrefectures = await res.data;

  if (
    Array.isArray(allPrefectures) &&
    allPrefectures.length &&
    allPrefectures.every(isPrefecture)
  ) {
    return allPrefectures.map((prefecture) => {
      return {
        params: {
          id: prefecture.id.toString(),
        },
      };
    });
  } else {
    throw new Error();
  }
};

export const getPrefectureName = async (prefectureId: string) => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/prefectures/${prefectureId}`);
  const prefecture = await res.data;

  if (Array.isArray(prefecture) && prefecture.length && prefecture.every(isPrefecture)) {
    const prefectureName = prefecture[0].prefecture;
    return prefectureName;
  } else {
    throw new Error();
  }
};

// 全ての都道府県とそれに紐づく衆議院小選挙区・衆議院比例代表ブロック・参議院選挙区を取得
export const getPrefWithAllConstituenciesAndBlocks = async () => {
  const apiBaseUrl = setApiBaseUrl();
  const res = await axios.get(`${apiBaseUrl}/prefectures/all_constituencies_and_blocks`);
  const prefectures = await res.data;

  if (
    Array.isArray(prefectures) &&
    prefectures.length &&
    prefectures.every(isPrefWithAllConstituenciesAndBlocks)
  ) {
    return prefectures;
  } else {
    throw new Error();
  }
};
