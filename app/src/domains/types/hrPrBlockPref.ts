import { isPropertyAccessible } from 'domains';

// 衆議院比例代表ブロック構成都道府県
export type HrPrBlockPref = {
  id: number;
  hr_pr_block_id?: number;
  prefecture_id?: number;
};

export const isHrPrBlockPref = (arg: unknown): arg is HrPrBlockPref => {
  if (!isPropertyAccessible(arg)) return false;
  return (
    typeof arg.id === 'number' &&
    ('hr_pr_block_id' in arg ? typeof arg.hr_pr_block_id === 'number' : true) &&
    ('prefecture_id' in arg ? typeof arg.prefecture_id === 'number' : true)
  );
};
