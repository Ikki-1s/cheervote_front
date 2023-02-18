// 現在の年齢を算出する。
// 【引数】
// birthday: 誕生日。"1990-01-31" 形式
export const ageCalculation = (birthday: string) => {
  const today = new Date();
  const newDateBirthday = new Date(birthday);

  const age = today.getFullYear() - newDateBirthday.getFullYear();
  const thisYearsBirthday = new Date(
    today.getFullYear(),
    newDateBirthday.getMonth(),
    newDateBirthday.getDate(),
  );
  return age + (thisYearsBirthday.getTime() > today.getTime() ? -1 : 0);
};
