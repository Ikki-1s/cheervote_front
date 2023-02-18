// apiに送信する評価投票内容
export type CvPostData = {
  which_house: string | null;
  politician_id: number | null;
  member_id: number | null;
  cv_term_id: number | null;
  cv_question_id: number;
  cv_evaluation_id: number | null;
};
