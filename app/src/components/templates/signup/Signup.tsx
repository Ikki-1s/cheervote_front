import SignupForm from 'components/ecosystems/SignupForm';
import Layout from 'components/templates/common/Layout';
import PageCenterWrap from 'components/templates/common/PageCenterWrap';

const Signup = () => {
  return (
    <Layout>
      <h1>ユーザー登録</h1>
      <PageCenterWrap>
        <SignupForm />
      </PageCenterWrap>
    </Layout>
  );
};

export default Signup;
