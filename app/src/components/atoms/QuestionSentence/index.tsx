import { css } from '@emotion/react';
import { fontWeight, typography } from 'styles/theme';

const styles = {
  wrap: css`
    display: flex;
    justify-content: center;
    /* align-items: flex-start; */
    gap: 10px;
  `,
  question: css`
    ${typography.lg}
    ${fontWeight.bold}
  `,
  sentence: css`
    /* max-width: 781px; */
  `,
};

type QuestionSentenceProps = {
  id?: string; //WAI-ARIAでidを付けておきたい時用
  questionNumber?: number | string;
  children: string;
};

const QuestionSentence = ({ id, questionNumber, children }: QuestionSentenceProps) => {
  return (
    <div {...(id && { id: id })} css={styles.wrap}>
      <div css={styles.question}>{questionNumber ? `Q${questionNumber}.` : 'Q.'}</div>
      <div css={[styles.question, styles.sentence]}>{children}</div>
    </div>
  );
};

export default QuestionSentence;
