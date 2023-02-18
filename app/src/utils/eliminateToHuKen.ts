/// eliminateToHuKen ///
// 引数に指定された都府県名の「都」、「府」、「県」の文字を除去する。
export const eliminateToHuKen = (prefectureName: string) => {
  return prefectureName.replace(/(.*)(都|府|県)/, '$1');
};
