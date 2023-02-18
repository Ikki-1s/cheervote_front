import SigninForm from 'components/organisms/SigninForm';
import Layout from 'components/templates/common/Layout';
import PageCenterWrap from '../common/PageCenterWrap';

const Signin = () => {
  return (
    <Layout>
      <h1>ログイン</h1>
      <PageCenterWrap>
        <SigninForm />
      </PageCenterWrap>
    </Layout>
  );
};

export default Signin;
