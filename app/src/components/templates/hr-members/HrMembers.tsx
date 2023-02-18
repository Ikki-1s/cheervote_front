import Layout from '../common/Layout';
import HrPrBlocksTable from 'components/organisms/HrPrBlocksTable';
import HrPrefecturesTable from 'components/organisms/HrPrefecturesTable';
import PageCenterWrap from '../common/PageCenterWrap';

const HrMembers = () => {
  return (
    <Layout>
      <h1>衆議院議員</h1>
      <h2>小選挙区</h2>
      <PageCenterWrap>
        <HrPrefecturesTable />
      </PageCenterWrap>
      <h2>比例代表</h2>
      <PageCenterWrap>
        <HrPrBlocksTable />
      </PageCenterWrap>
    </Layout>
  );
};

export default HrMembers;
