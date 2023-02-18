import { isPropertyAccessible } from 'domains';

// 支持投票期間（衆議院・参議院）
export type CvTerm = {
  id: number;
  start_date: string;
  end_date: string;
  created_at?: string;
  updated_at?: string;
};

export const isCvTerm = (arg: unknown): arg is CvTerm => {
  if (!isPropertyAccessible(arg)) return false;
  return (
    typeof arg.id === 'number' &&
    typeof arg.start_date === 'string' &&
    typeof arg.end_date === 'string'
  );
};
