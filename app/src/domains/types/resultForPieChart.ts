import { isPropertyAccessible } from 'domains';

// 支持投票結果の円グラフ表示用データ
export type ResultForPieChart = {
  labels: string[];
  which_house: string;
  data: number[];
  total: number;
};

export const isResultForPieChart = (arg: unknown): arg is ResultForPieChart => {
  if (!isPropertyAccessible(arg)) return false;
  return (
    Array.isArray(arg.labels) &&
    arg.labels.every((v) => typeof v === 'string') &&
    typeof arg.which_house === 'string' &&
    Array.isArray(arg.data) &&
    arg.data.every((v) => typeof v === 'number') &&
    typeof arg.total === 'number'
  );
};
