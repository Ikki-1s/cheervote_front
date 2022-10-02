import axios from 'axios';

import { isCvQuestionData } from './common/userDefinedTypeGuards';

export const getCvQuestionData = async (cvQuestionId: string) => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/cv_questions/${cvQuestionId}`);
  const cvQuestionData = await res.data;
  if (isCvQuestionData(cvQuestionData)) {
    return cvQuestionData;
  } else {
    throw new Error();
  }
};
