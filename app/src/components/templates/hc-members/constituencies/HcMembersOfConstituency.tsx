import { css } from '@emotion/react';
import { fontWeight, typography } from 'styles/theme';
import Layout from 'components/templates/common/Layout';
import HcMembersTable from 'components/organisms/HcMembersTable';
import PageCenterWrap from 'components/templates/common/PageCenterWrap';
import { HcConstituency, valueof } from 'domains';

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
  constituencyName: css`
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
  quota: css`
    ${typography.heading3}
    ${fontWeight.bold}
  `,
};

type HcMembersOfConstituencyTemplateProps = {
  hcConstituency: HcConstituency;
  hcMembersTable: valueof<Pick<Parameters<typeof HcMembersTable>[0], 'hcMembers'>>;
};

const HcMembersOfConstituency = ({
  hcConstituency,
  hcMembersTable,
}: HcMembersOfConstituencyTemplateProps) => {
  return (
    <Layout>
      <h1>参議院議員</h1>
      <div css={styles.subTitleWrap}>
        <h2 css={styles.subTitle}>
          選挙区
          <span css={styles.constituencyName}>{hcConstituency.name}</span>
        </h2>
        <div css={styles.quotaWrap}>
          <span css={styles.constant}>定数</span>
          <span css={styles.quota}>{hcConstituency.quota}</span>
        </div>
      </div>
      <PageCenterWrap>
        <HcMembersTable hcMembers={hcMembersTable} />
      </PageCenterWrap>
    </Layout>
  );
};

export default HcMembersOfConstituency;
