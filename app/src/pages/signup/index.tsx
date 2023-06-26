import { useContext, useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { CurrentUserContext } from 'stores/CurrentUserProvider';
import Template from 'components/templates/signup/Signup';
import Meta from 'components/organisms/Meta';

const Signup: NextPage = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const router = useRouter();
  const [isDisplay, setIsDisplay] = useState<boolean>(false);

  useEffect(() => {
    if (currentUser) {
      router.push('/');
    } else {
      setIsDisplay(true);
    }
  }, []);

  return isDisplay ? (
    <>
      <Meta
        pageTitle='ユーザー登録'
        pageDesc='CHEERVOTEのユーザー登録ページです。ユーザー登録すると、マイ選挙区(自分の住む地域)から選出された議員に定期的に評価の投票をすることができます。'
      />
      <Template />
    </>
  ) : (
    <></>
  );
};

export default Signup;
