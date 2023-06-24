import { CvPageData, CvPostData, CvQuestionAndValues, postCvEvaluation } from 'domains';
import Organism from 'components/organisms/CvPostForm';
import ReplacementMessageBox from 'components/organisms/ReplacementMessageBox';

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
          <ReplacementMessageBox messagePattern='alreadyVoted' />
        )
      ) : (
        <ReplacementMessageBox messagePattern='notMyConstituencyMember' />
      )
    ) : (
      <ReplacementMessageBox messagePattern='notLoggedin' />
    )
  ) : (
    <ReplacementMessageBox messagePattern='outOfCvTerm' />
  );
  // ) : (
  // <ReplacementMessageBox messagePattern='ActiveMemberNotFound' />
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
