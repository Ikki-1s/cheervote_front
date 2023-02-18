// apiから取得した日付形式の文字列を「YYYY/MM/DD」形式にする
// 【引数】
//  date: apiから取得した日付形式の文字列
//  backDate?: 指定すると、指定した値分戻した日付にする
export const convertDateToJpYMD = (date: string, backDate?: number) => {
  let tmpDate = new Date(date);

  if (backDate) {
    tmpDate.setDate(tmpDate.getDate() - backDate);
  }

  return tmpDate.toLocaleDateString('ja-JP');
};
