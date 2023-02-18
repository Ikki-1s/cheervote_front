import { isPropertyAccessible } from 'domains';

// 衆議院小選挙区
export type HrConstituency = {
  id: number;
  name: string;
  constituent_region?: string | null;
  prefecture_id?: number;
};

export const isHrConstituency = (arg: unknown): arg is HrConstituency => {
  if (!isPropertyAccessible(arg)) return false;
  return (
    typeof arg.id === 'number' &&
    typeof arg.name === 'string' &&
    ('constituent_region' in arg
      ? typeof arg.constituent_region === 'string' || arg.constituent_region === null
      : true) &&
    ('prefecture_id' in arg ? typeof arg.prefecture_id === 'number' : true)
  );
};
