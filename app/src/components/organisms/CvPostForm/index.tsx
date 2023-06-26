import { useState } from 'react';
import { css } from '@emotion/react';
import { AxiosResponse } from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CvEvaluationParams, CvQuestionAndValues } from 'domains';
import ColorButton from 'components/atoms/ColorButton';
import QuestionSentence from 'components/atoms/QuestionSentence';
import RadioButtonAndLabel from 'components/molecules/RadioButtonAndLabel';
import CvCompleteMessageBox from 'components/organisms/CvCompleteMessageBox';
import AlertMessageBox from 'components/atoms/AlertMessageBox';

const styles = {
  wrap: css`
    display: flex;
    flex-direction: column;
    gap: 30px;
  `,
  radioList: css`
    display: flex;
  `,
  formBody: css`
    display: flex;
    flex-direction: column;
    /* align-items: flex-end; */
    align-items: center;
    gap: 50px;
  `,
};

type Inputs = CvEvaluationParams;

type CvPostFormOrganismProps = {
  postAction: (input: string) => Promise<AxiosResponse<any, any>>;
  cvQuestionAndValues: CvQuestionAndValues;
};

const CvPostForm = ({ postAction, cvQuestionAndValues }: CvPostFormOrganismProps) => {
  const {
    register, // 入力または選択された要素を登録し検証
    handleSubmit, // 検証が成功するとフォーム内のデータを受け取る
    formState: { errors }, // バリデーションエラーを受け取る
    // reset,
  } = useForm<Inputs>({
    criteriaMode: 'firstError',
    shouldFocusError: true,
  });
  const [cvComplete, setCvComplete] = useState<boolean>(false);
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false);

  const formRegister = { ...register('evaluation', { required: true }) };

  const onSubmit: SubmitHandler<Inputs> = async (inputValue) => {
    try {
      const res = await postAction(inputValue.evaluation);

      if (res.status === 201) {
        setCvComplete(true);
      } else {
        console.log('登録失敗');
        setAlertMessageOpen(true);
      }
    } catch (err) {
      console.log('catch error');
      setAlertMessageOpen(true);
    }
  };

  return cvComplete ? (
    <CvCompleteMessageBox />
  ) : (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div css={styles.wrap}>
        {alertMessageOpen && (
          <AlertMessageBox>エラーが発生しました。ブラウザを更新してください</AlertMessageBox>
        )}
        <QuestionSentence id='evaluationGroupLabel'>
          {cvQuestionAndValues.cv_question.question_sentence}
        </QuestionSentence>
        <div css={styles.formBody}>
          <ul css={styles.radioList} aria-labelledby='evaluationGroupLabel'>
            {cvQuestionAndValues.cv_evaluation_values.map((data) => {
              return (
                <li key={data.id.toString()}>
                  <RadioButtonAndLabel
                    id={data.id.toString()}
                    value={data.value.toString()}
                    register={formRegister}
                  >
                    {data.value_name}
                  </RadioButtonAndLabel>
                </li>
              );
            })}
          </ul>
          <ColorButton type='submit' width={400} color='blue' fontWeight='medium'>
            投票する
          </ColorButton>
        </div>
      </div>
    </form>
  );
};

export default CvPostForm;
