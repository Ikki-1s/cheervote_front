import { isPropertyAccessible } from 'domains';

// 参議院選挙区構成都道府県
export type HcConstituencyPref = {
  id: number;
  hc_constituency_id?: number;
  prefecture_id?: number;
};

export const isHcConstituencyPref = (arg: unknown): arg is HcConstituencyPref => {
  if (!isPropertyAccessible(arg)) return false;
  return (
    typeof arg.id === 'number' &&
    ('hc_constituency_id' in arg ? typeof arg.hc_constituency_id === 'number' : true) &&
    ('prefecture_id' in arg ? typeof arg.prefecture_id === 'number' : true)
  );
};
