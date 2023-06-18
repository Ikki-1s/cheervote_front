import { NextPage } from 'next';
import Template from 'components/templates/hc-members/HcMembers';
import Meta from 'components/organisms/Meta';

const HcMembers: NextPage = () => {
  return (
    <>
      <Meta pageTitle='参議院議員' pageDesc='参議院議員のページです。' />
      <Template />
    </>
  );
};

export default HcMembers;
