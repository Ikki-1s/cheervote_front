import Layout from 'components/layout';
import { SignUpForm } from 'components/signUpForm';
import { NextPage } from 'next';

const SignUp: NextPage = () => {
  return (
    <Layout>
      <h1 className='flex justify-center m-2 text-6xl font-semibold tracking-wider leading-tight'>
        ユーザー登録
      </h1>
      <SignUpForm />
    </Layout>
  );
};

export default SignUp;
