import { isPropertyAccessible } from 'domains';

// 支持投票評価値
export type CvEvaluationValue = {
  id: number;
  cv_question_id: number;
  value: number;
  value_name: string | null;
};

export const isCvEvaluationValue = (arg: unknown): arg is CvEvaluationValue => {
  if (!isPropertyAccessible(arg)) return false;
  return (
    typeof arg.id === 'number' &&
    typeof arg.cv_question_id === 'number' &&
    typeof arg.value === 'number' &&
    (typeof arg.value_name === 'string' || arg.value_name === null)
  );
};
