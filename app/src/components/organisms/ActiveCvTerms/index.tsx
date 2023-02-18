import { css } from '@emotion/react';
import { CvTerm } from 'domains';
import { color, fontWeight, typography } from 'styles/theme';
import { convertDateToJpYMD } from 'utils';

const styles = {
  wrap: css`
    width: fit-content;
    display: flex;
    flex-direction: column;
    gap: 6px;
  `,
  title: css`
    width: fit-content;
    padding: 6px 0;
    border-bottom: 3px solid ${color.gray};
  `,
  subTitleAndCvTerm: css`
    display: flex;
    gap: 20px;
  `,
  subTitle: css`
    ${fontWeight.medium}
  `,
};

type ActiveCvTermsProps = {
  hrCvTerm: CvTerm | null;
  hcCvTerm: CvTerm | null;
};

const ActiveCvTerms = ({ hrCvTerm, hcCvTerm }: ActiveCvTermsProps) => {
  return (
    <div css={styles.wrap}>
      <div css={styles.title}>現在の投票受付期間</div>
      <div css={styles.subTitleAndCvTerm}>
        <span css={styles.subTitle}>衆議院議員</span>
        {hrCvTerm
          ? `${convertDateToJpYMD(hrCvTerm.start_date)} 〜 ${convertDateToJpYMD(
              hrCvTerm.end_date,
              1,
            )}`
          : '受付期間外'}
      </div>
      <div css={styles.subTitleAndCvTerm}>
        <span css={styles.subTitle}>参議院議員</span>
        {hcCvTerm
          ? `${convertDateToJpYMD(hcCvTerm.start_date)} 〜 ${convertDateToJpYMD(
              hcCvTerm.end_date,
              1,
            )}`
          : '受付期間外'}
      </div>
    </div>
  );
};

export default ActiveCvTerms;
