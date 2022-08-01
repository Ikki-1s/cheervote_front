import axios from 'axios';

import { Prefecture } from 'types/prefecture';

// ユーザー定義型ガード
const isPropertyAccessible = (value: unknown): value is { [key: string]: unknown } => {
  // nullとundefinedの可能性を排除
  return value != null;
};

const isPrefecture = (arg: unknown): arg is Prefecture => {
  if (!isPropertyAccessible(arg)) return false; // プロパティアクセス出来ない可能性を排除
  return typeof arg.id === 'number' && typeof arg.prefecture === 'string';
};
// const isPrefecture = (arg: unknown): arg is Prefecture => {
//   if (!arg) return false; // null, undefined の場合を除く
//   const prefecture = arg as Prefecture; // 型アサーションで Prefecture型とみなす
//   return typeof prefecture?.id === 'number' && typeof prefecture?.prefecture === 'string';
// };

export const getAllPrefecturesData = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/prefectures`);
  const allPrefecturesData = await res.data;

  if (Array.isArray(allPrefecturesData) && allPrefecturesData.every(isPrefecture)) {
    return allPrefecturesData;
  } else {
    // 型ガード後のelseどうしようか。とりあえずError投げとく
    throw new Error();
  }
};

export const getAllPrefecturesIds = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/prefectures`);
  const allPrefecturesData = await res.data;

  if (Array.isArray(allPrefecturesData) && allPrefecturesData.every(isPrefecture)) {
    return allPrefecturesData.map((prefectureData) => {
      return {
        params: {
          id: prefectureData.id.toString(),
        },
      };
    });
  } else {
    throw new Error();
  }
};

export const getPrefectureName = async (prefectureId: string) => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/prefectures/${prefectureId}`);
  const prefectureData = await res.data;

  if (Array.isArray(prefectureData) && prefectureData.every(isPrefecture)) {
    const prefectureName = prefectureData[0].prefecture;
    return prefectureName;
  } else {
    throw new Error();
  }
};
