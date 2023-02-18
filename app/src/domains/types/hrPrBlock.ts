import { isPropertyAccessible } from 'domains';

// 衆議院比例代表ブロック
export type HrPrBlock = {
  id: number;
  block_name: string;
  quota?: number;
};

export const isHrPrBlock = (arg: unknown): arg is HrPrBlock => {
  if (!isPropertyAccessible(arg)) return false;
  return (
    typeof arg.id === 'number' &&
    typeof arg.block_name === 'string' &&
    // typeof arg.quota === 'number'
    ('quota' in arg ? typeof arg.quota === 'number' : true)
  );
};
