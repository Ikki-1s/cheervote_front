import { isPropertyAccessible } from 'domains';

// 支持投票設問
export type CvQuestion = {
  id: number;
  question_sentence: string;
  note: string | null;
};

export const isCvQuestion = (arg: unknown): arg is CvQuestion => {
  if (!isPropertyAccessible(arg)) return false;
  return (
    typeof arg.id === 'number' &&
    typeof arg.question_sentence === 'string' &&
    (typeof arg.note === 'string' || arg.note === null)
  );
};
