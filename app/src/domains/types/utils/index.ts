//// ユーザー定義型ガードの実装に用いる共通の関数 ////

/// isPropertyAccessible ///
// プロパティアクセス出来ない可能性を排除
// export const isPropertyAccessible = (arg: unknown): arg is { [key: string]: unknown } => {
export const isPropertyAccessible = (arg: unknown): arg is Record<string, unknown> => {
  // 以下の記述でnullとundefinedの両方の可能性を排除
  return arg != null;
};

/// valueOf<T> ///
// keyofの反対。与えられたオブジェクトのvalueのユニオン型を作る
// 例.
// const HOGE = {
//   hoge: 'test',
//   fuga: 'test2'
// } as const;
// type Hoge = valueof<typeOf HOGE>  // 'test' | 'test2'
export type valueof<T> = T[keyof T];
