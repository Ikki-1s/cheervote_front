import { useRouter } from 'next/router';
import useSWR from 'swr';
import Organism from 'components/organisms/Header';
import { getCurrentUser, signout } from 'domains';
import { destroyClientSideCookie } from 'utils/cookie';

const navigationDropDownData = [
  {
    buttonTitle: '国会議員一覧',
    details: [
      {
        title: '衆議院議員',
        url: '/hr-members',
      },
      {
        title: '参議院議員',
        url: '/hc-members',
      },
      {
        title: '政党別国会議員',
        url: '/political-parties',
      },
    ],
  },
];

const userDropDownDetails = [
  {
    title: 'アカウント設定',
    url: '/',
  },
];

const Header = () => {
  const router = useRouter();

  const handleSignout = async () => {
    try {
      const res = await signout();

      // ステータスがsuccessでもsuccessでなくてもどちらもログアウトでやるべき処理は変わらないのでは？
      if (res.data.success === true) {
        destroyClientSideCookie();
        router.reload();
      } else {
        // どういうパターンでここ通る？
        console.log('Failed in sign out');
        destroyClientSideCookie();
        router.reload();
      }
    } catch (err) {
      console.log(err);
      destroyClientSideCookie();
      router.reload();
    }
  };

  const { data, isLoading } = useSWR('/auth/sessions', getCurrentUser, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
  });

  const userDropDownMenu = data?.name
    ? { userName: data.name, userIconSrc: data.image }
    : undefined;

  return (
    <Organism
      navigationDropDownData={navigationDropDownData}
      isLoadingUser={isLoading}
      userDropDownMenu={isLoading ? undefined : userDropDownMenu}
      userDropDownDetails={userDropDownDetails}
      handleSignOut={handleSignout}
    />
  );
};

export default Header;
