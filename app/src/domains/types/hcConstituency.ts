import { isPropertyAccessible } from 'domains';

// 参議院選挙区
export type HcConstituency = {
  id: number;
  name: string;
  quota: number;
  reelection_number: number;
};

export const isHcConstituency = (arg: unknown): arg is HcConstituency => {
  if (!isPropertyAccessible(arg)) return false;
  return (
    typeof arg.id === 'number' &&
    typeof arg.name === 'string' &&
    // typeof arg.quota === 'number' &&
    // typeof arg.reelection_number === 'number'
    ('quota' in arg ? typeof arg.quota === 'number' : true) &&
    ('reelection_number' in arg ? typeof arg.reelection_number === 'number' : true)
  );
};
