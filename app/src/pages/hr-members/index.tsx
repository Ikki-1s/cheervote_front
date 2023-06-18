import { NextPage } from 'next';
import Template from 'components/templates/hr-members/HrMembers';
import Meta from 'components/organisms/Meta';

const HrMembers: NextPage = () => {
  return (
    <>
      <Meta pageTitle='衆議院議員' pageDesc='衆議院議員のページです。' />
      <Template />
    </>
  );
};

export default HrMembers;
