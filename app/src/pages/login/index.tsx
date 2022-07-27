import { NextPage } from 'next';

import Layout from 'components/layout';
import { LoginForm } from 'components/loginForm';

const Login: NextPage = () => {
  return (
    <Layout>
      <h1 className='flex justify-center m-2 text-6xl font-semibold tracking-wider leading-tight'>
        ログイン
      </h1>
      <LoginForm />
    </Layout>
  );
};

export default Login;
