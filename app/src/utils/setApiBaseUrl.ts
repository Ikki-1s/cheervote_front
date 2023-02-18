// クライアントサイド実行か、サーバーサイド実行かで
// apiアクセス時のURLを分けてセットする
export const setApiBaseUrl = () => {
  let reqUrl: string;

  if (typeof window !== 'undefined') {
    // クライアントサイドからアクセス時のURLをセット
    reqUrl = `${process.env.NEXT_PUBLIC_CLIENT_SIDE_API_URL}`;
  } else {
    // サーバーサイドからアクセス時のURLをセット
    reqUrl = `${process.env.NEXT_PUBLIC_API_URL}`;
  }

  return reqUrl;
};
