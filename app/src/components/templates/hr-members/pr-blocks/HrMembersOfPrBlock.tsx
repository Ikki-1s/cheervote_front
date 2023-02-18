import { css } from '@emotion/react';
import { fontWeight, typography } from 'styles/theme';
import Layout from 'components/templates/common/Layout';
import HrMembersOfPrBlockTable from 'components/organisms/HrMembersOfPrBlockTable';
import PageCenterWrap from 'components/templates/common/PageCenterWrap';
import { HrPrBlock, valueof } from 'domains';

const styles = {
  subTitleWrap: css`
    display: flex;
    align-items: baseline;
    gap: 60px;
  `,
  subTitle: css`
    display: flex;
    align-items: baseline;
    gap: 60px;
  `,
  blockName: css`
    ${typography.heading1}
  `,
  quotaWrap: css`
    display: flex;
    align-items: baseline;
    gap: 10px;
  `,
  constant: css`
    ${typography.lg}
    ${fontWeight.regular}
  `,
  blockQuota: css`
    ${typography.heading3}
    ${fontWeight.bold}
  `,
};

type HrMembersOfPrBlockTemplateProps = {
  hrPrBlock: HrPrBlock;
  hrMembersOfPrBlockTable: valueof<
    Pick<Parameters<typeof HrMembersOfPrBlockTable>[0], 'hrMembersOfPrBlock'>
  >;
};

const HrMembersOfPrBlock = ({
  hrPrBlock,
  hrMembersOfPrBlockTable,
}: HrMembersOfPrBlockTemplateProps) => {
  return (
    <Layout>
      <h1>衆議院議員</h1>
      <div css={styles.subTitleWrap}>
        <h2 css={styles.subTitle}>
          比例代表
          <span css={styles.blockName}>{hrPrBlock.block_name}ブロック</span>
        </h2>
        <div css={styles.quotaWrap}>
          <span css={styles.constant}>定数</span>
          <span css={styles.blockQuota}>{hrPrBlock.quota}</span>
        </div>
      </div>
      <PageCenterWrap>
        <HrMembersOfPrBlockTable hrMembersOfPrBlock={hrMembersOfPrBlockTable} />
      </PageCenterWrap>
    </Layout>
  );
};

export default HrMembersOfPrBlock;
