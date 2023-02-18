import { css } from '@emotion/react';
import { typography } from 'styles/theme';
import Layout from 'components/templates/common/Layout';
import HrMembersOfPrefectureTable from 'components/organisms/HrMembersOfPrefectureTable';
import PageCenterWrap from 'components/templates/common/PageCenterWrap';
import { valueof } from 'domains';

const styles = {
  subTitleWrap: css`
    display: flex;
    align-items: baseline;
    gap: 60px;
  `,
  prefecture: css`
    ${typography.heading1}
  `,
};

type HrMembersOfPrefectureTemplateProps = {
  prefectureName: string;
  hrMembersOfPrefectureTable: valueof<
    Pick<Parameters<typeof HrMembersOfPrefectureTable>[0], 'hrMembersOfPrefecture'>
  >;
};

const HrMembersOfPrefecture = ({
  prefectureName,
  hrMembersOfPrefectureTable,
}: HrMembersOfPrefectureTemplateProps) => {
  return (
    <Layout>
      <h1>衆議院議員</h1>
      <h2 css={styles.subTitleWrap}>
        小選挙区
        <span css={styles.prefecture}>{prefectureName}</span>
      </h2>
      <PageCenterWrap>
        <HrMembersOfPrefectureTable hrMembersOfPrefecture={hrMembersOfPrefectureTable} />
      </PageCenterWrap>
    </Layout>
  );
};

export default HrMembersOfPrefecture;
