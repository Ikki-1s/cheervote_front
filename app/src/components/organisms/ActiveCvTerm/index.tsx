import type { CvTerm } from 'domains';
import { convertDateToJpYMD } from 'utils';

const ActiveCvTerm = (currentCvterm: CvTerm) => {
  const convert_start_date = convertDateToJpYMD(currentCvterm.start_date);
  const convert_end_date = convertDateToJpYMD(currentCvterm.end_date, 1);
  return <div>{`現在の投票受付期間： ${convert_start_date} 〜 ${convert_end_date}`}</div>;
};

export default ActiveCvTerm;
