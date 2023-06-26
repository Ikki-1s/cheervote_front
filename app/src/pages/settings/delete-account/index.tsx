import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { CurrentUserContext } from 'stores/CurrentUserProvider';
import Meta from 'components/organisms/Meta';
import Template from 'components/templates/settings/delete-account/DeleteAccount';

const DeleteAccount = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const router = useRouter();
  const [isDisplay, setIsDisplay] = useState<boolean>(false);

  useEffect(() => {
    if (!currentUser) {
      router.push('/signin');
    } else {
      setIsDisplay(true);
    }
  }, []);

  return isDisplay ? (
    <>
      <Meta pageTitle='アカウントの削除' pageDesc='アカウントの削除ページです。' />
      <Template />
    </>
  ) : (
    <></>
  );
};

export default DeleteAccount;
