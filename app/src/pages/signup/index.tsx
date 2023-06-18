import { NextPage } from 'next';
import Template from 'components/templates/signup/Signup';
import Meta from 'components/organisms/Meta';

const Signup: NextPage = () => {
  return (
    <>
      <Meta
        pageTitle='ユーザー登録'
        pageDesc='CHEERVOTEのユーザー登録ページです。ユーザー登録すると、マイ選挙区(自分の住む地域)から選出された議員に定期的に評価の投票をすることができます。'
      />
      <Template />
    </>
  );
};

export default Signup;
