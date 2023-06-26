import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { CurrentUserContext } from 'stores/CurrentUserProvider';

const useCheckSignedIn = () => {
  const { currentUser } = useContext(CurrentUserContext);
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push('/signin');
    }
  }, [currentUser]);

  return !!currentUser;
};

export default useCheckSignedIn;
