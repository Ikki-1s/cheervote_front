import axios from 'axios';
import { isCvQuestionAndValues } from 'domains';
import { setApiBaseUrl } from 'utils';

export const getCvQuestionAndValues = async (cvQuestionId: string) => {
  const apiBaseUrl = setApiBaseUrl();
  const res = await axios.get(`${apiBaseUrl}/cv_questions/${cvQuestionId}`);
  const cvQuestionAndValues = await res.data;
  if (isCvQuestionAndValues(cvQuestionAndValues)) {
    return cvQuestionAndValues;
  } else {
    throw new Error();
  }
};
