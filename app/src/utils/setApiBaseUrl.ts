// クライアントサイド実行か、サーバーサイド実行かで
// apiアクセス時のURLを分けてセットする
export const setApiBaseUrl = () => {
  return typeof window !== 'undefined'
    ? // クライアントサイドからアクセス時のURLをセット
      `${process.env.NEXT_PUBLIC_CLIENT_SIDE_API_URL}`
    : // サーバーサイドからアクセス時のURLをセット
      `${process.env.NEXT_PUBLIC_API_URL}`;
};
