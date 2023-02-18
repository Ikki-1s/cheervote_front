import Link from 'next/link';
import { css } from '@emotion/react';
import { CvQuestion, ResultForPieChart } from 'domains';
import { PieChart } from 'components/atoms/Chart';
import ColorButton from 'components/atoms/ColorButton';
import SelectBox, { SelectBoxProps } from 'components/molecules/SelectBox';
import QuestionSentence from 'components/atoms/QuestionSentence';

const styles = {
  wrap: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 30px;
    max-width: 990px;
  `,
  titleWrap: css`
    display: flex;
    align-items: center;
    gap: 80px;
  `,
  button: css`
    margin-top: 10px;
  `,
  cvTermWrap: css`
    display: flex;
    align-items: center;
    gap: 30px;
  `,
  pieChartWrap: css`
    width: inherit;
  `,
  noVoting: css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 200px;
    height: 500px;
  `,
};

export type PoliticianCvResultProps = {
  politicianId: string;
  cvTerms: SelectBoxProps;
  cvQuestion: CvQuestion;
  cvResult: ResultForPieChart;
};

const PoliticianCvResult = ({
  politicianId,
  cvTerms,
  cvQuestion,
  cvResult,
}: PoliticianCvResultProps) => {
  return (
    <div css={styles.wrap}>
      <div css={styles.titleWrap}>
        <h2>評価投票の結果</h2>
        <Link href={`/cheervote?politician=${politicianId}`} passHref>
          <a css={styles.button}>
            <ColorButton color='pink'>評価の投票はコチラ</ColorButton>
          </a>
        </Link>
      </div>
      <div css={styles.cvTermWrap}>
        表示する投票期間
        <SelectBox {...cvTerms} />
      </div>
      <QuestionSentence>{cvQuestion.question_sentence}</QuestionSentence>
      {cvResult.total > 0 ? (
        <div css={styles.pieChartWrap}>
          <PieChart {...cvResult} />
        </div>
      ) : (
        <div css={styles.noVoting}>この期間の投票はありません。</div>
      )}
    </div>
  );
};

export default PoliticianCvResult;
