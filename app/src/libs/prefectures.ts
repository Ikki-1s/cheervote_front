import fetch from 'node-fetch';

const apiUrl = 'http://api:3000/api/v1/prefectures';

type Prefecture = {
  id: number;
  prefecture: string;
};

export const getAllPrefecturesData = async () => {
  const response = await fetch(apiUrl, { method: 'GET' });
  const prefectures: any = await response.json();
  return prefectures;
};

export const getAllPrefecturesIds = async () => {
  const response = await fetch(apiUrl);
  const prefectures: any = await response.json();
  return (prefectures.map = (prefecture: Prefecture) => {
    return {
      params: {
        id: prefecture.id,
      },
    };
  });
};
