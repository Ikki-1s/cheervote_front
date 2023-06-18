import { NextPage } from 'next';
import Template from 'components/templates/signin/Signin';
import Meta from 'components/organisms/Meta';

const Signin: NextPage = () => {
  return (
    <>
      <Meta pageTitle='ログイン' pageDesc='CHEERVOTEのログインページです。' />
      <Template />
    </>
  );
};

export default Signin;
