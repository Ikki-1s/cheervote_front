import { useContext, useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { CurrentUserContext } from 'stores/CurrentUserProvider';
import Meta from 'components/organisms/Meta';
import Template from 'components/templates/signin/Signin';

const Signin: NextPage = () => {
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
      <Meta pageTitle='ログイン' pageDesc='CHEERVOTEのログインページです。' />
      <Template />
    </>
  ) : (
    <></>
  );
};

export default Signin;
