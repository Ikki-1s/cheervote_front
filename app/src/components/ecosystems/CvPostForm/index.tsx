import { CvPageData, CvPostData, CvQuestionAndValues, postCvEvaluation } from 'domains';
import Organism from 'components/organisms/CvPostForm';

type CvPostFormEcosystemProps = {
  cvPageData: CvPageData;
  cvQuestionAndValues: CvQuestionAndValues;
};

const CvPostForm = ({ cvPageData, cvQuestionAndValues }: CvPostFormEcosystemProps) => {
  const cvPostData = setInitialCvPostData(cvPageData, cvQuestionAndValues);

  const postAction = (input: string) => {
    cvPostData.cv_evaluation_id = Number(input);
    return postCvEvaluation(cvPostData);
  };

  // return cvPageData.is_active_house_member ? (
  return cvPageData.current_cv_term ? (
    cvPageData.is_login ? (
      cvPageData.is_my_constituency_member ? (
        cvPageData.is_login_user_possible_to_cv_on_term ? (
          <Organism postAction={postAction} cvQuestionAndValues={cvQuestionAndValues} />
        ) : (
          <p>
            現在の投票受付期間にすでに投票済みです。
            <br />
            次回の受付期間での投票もよろしくお願いいたします。
          </p>
        )
      ) : (
        <p>
          マイ選挙区の議員でないため、この議員に
          <br />
          評価の投票をすることはできません。
        </p>
      )
    ) : (
      <p>
        マイ選挙区の議員である場合、ログインすると
        <br />
        評価の投票をすることができます。
      </p>
    )
  ) : (
    <p>評価の投票の受付期間外です。</p>
  );
  // ) : (
  //   <p>
  //     指定の政治家がいないか、現役議員ではないため、
  //     <br />
  //     評価の投票をすることができません。
  //   </p>
  // );
};

export default CvPostForm;

const setInitialCvPostData = (
  cvPageData: CvPageData,
  cvQuestionAndValues: CvQuestionAndValues,
): CvPostData => {
  return {
    which_house: cvPageData.is_active_house_member
      ? cvPageData.hc_member
        ? 'hc'
        : cvPageData.hr_member
        ? 'hr'
        : null
      : null,
    politician_id: cvPageData.is_active_house_member
      ? cvPageData.hc_member
        ? cvPageData.hc_member.politician.id
        : cvPageData.hr_member
        ? cvPageData.hr_member.politician.id
        : null
      : null,
    member_id: cvPageData.is_active_house_member
      ? cvPageData.hc_member
        ? cvPageData.hc_member.id
        : cvPageData.hr_member
        ? cvPageData.hr_member.id
        : null
      : null,
    cv_term_id: cvPageData.current_cv_term ? cvPageData.current_cv_term.id : null,
    // 暫定
    cv_question_id: cvQuestionAndValues.cv_question.id,
    cv_evaluation_id: null,
  };
};
