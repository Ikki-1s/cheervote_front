import {
  isPropertyAccessible,
  CvQuestion,
  isCvQuestion,
  CvEvaluationValue,
  isCvEvaluationValue,
} from 'domains';

/// 支持投票設問 & 支持投票評価値 ///
export type CvQuestionAndValues = {
  cv_question: CvQuestion;
  cv_evaluation_values: CvEvaluationValue[];
};

/// 支持投票設問 & 支持投票評価値 ///
export const isCvQuestionAndValues = (arg: unknown): arg is CvQuestionAndValues => {
  if (
    !isPropertyAccessible(arg) ||
    !isPropertyAccessible(arg.cv_question) ||
    !isPropertyAccessible(arg.cv_evaluation_values)
  )
    return false;

  // 支持投票評価値の配列のチェック
  if (!Array.isArray(arg.cv_evaluation_values)) return false;
  if (arg.cv_evaluation_values.some((v) => !isCvEvaluationValue(v))) return false;

  // 支持投票設問の部分のチェック
  return isCvQuestion(arg.cv_question);
};
