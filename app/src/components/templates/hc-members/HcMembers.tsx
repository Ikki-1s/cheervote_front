import { css } from '@emotion/react';
import Layout from '../common/Layout';
import PageCenterWrap from '../common/PageCenterWrap';
import HcConstituenciesTable from 'components/organisms/HcConstituenciesTable';
import HcPrTable from 'components/organisms/HcPrTable';

const styles = {
  hcPrTable: css`
    display: flex;
    justify-content: flex-start;
    margin: 0 100px;
  `,
};

const HcMembers = () => {
  return (
    <Layout>
      <h1>参議院議員</h1>
      <h2>選挙区</h2>
      <PageCenterWrap>
        <HcConstituenciesTable />
      </PageCenterWrap>
      <h2>全国比例</h2>
      <div css={styles.hcPrTable}>
        <HcPrTable />
      </div>
    </Layout>
  );
};

export default HcMembers;
