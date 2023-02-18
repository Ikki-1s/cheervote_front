import { css } from '@emotion/react';
import { fontWeight, typography } from 'styles/theme';
import Layout from 'components/templates/common/Layout';
import HcMembersTable from 'components/organisms/HcMembersTable';
import PageCenterWrap from 'components/templates/common/PageCenterWrap';
import { HC_PR_QUOTA, valueof } from 'domains';

const styles = {
  subTitleWrap: css`
    display: flex;
    align-items: baseline;
    gap: 60px;
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
  quota: css`
    ${typography.heading3}
    ${fontWeight.bold}
  `,
};

type HcMembersOfPrTemplateProps = {
  hcMembersTable: valueof<Pick<Parameters<typeof HcMembersTable>[0], 'hcMembers'>>;
};

const HcMembersOfPr = ({ hcMembersTable }: HcMembersOfPrTemplateProps) => {
  return (
    <Layout>
      <h1>参議院議員</h1>
      <div css={styles.subTitleWrap}>
        <h2>全国比例</h2>
        <div css={styles.quotaWrap}>
          <span css={styles.constant}>定数</span>
          <span css={styles.quota}>{HC_PR_QUOTA}</span>
        </div>
      </div>
      <PageCenterWrap>
        <HcMembersTable hcMembers={hcMembersTable} />
      </PageCenterWrap>
    </Layout>
  );
};

export default HcMembersOfPr;
