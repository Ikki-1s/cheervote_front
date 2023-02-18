import { signOut } from 'domains';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { destroyClientSideCookie } from 'utils/cookie';
import Header from './ecosystems/Header';
import Footer from './organisms/Footer';

export const siteTitle = 'CHEERVOTE';

const Layout2 = ({ children }: { children: ReactNode }) => {
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
  // const userDropDownData = undefined;
  // const userDropDownData = {
  //   userName: 'ユーザー名が１６文字以上の表示テキスト',
  //   // userName: 'ユーザー',
  //   userIconSrc: '/UserImage.png',
  //   details: [
  //     {
  //       title: 'アカウント設定',
  //       url: '/',
  //     },
  //   ],
  // };

  const router = useRouter();

  const handleSignOut = async () => {
    try {
      const res = await signOut();

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

  return (
    <>
      <Header />
      {/* <nav className='sticky -top-0 z-50 bg-white dark:bg-gray-800 border-b'>
        <ul className='flex justify-center space-x-4 text-sm tracking-wider md:text-base'>
          <li className='py-4 px-2 hover:font-bold list-none hover:text-blue-400 hover:border-b-4 hover:border-blue-400'>
            <Link href='/'>
              <a>Home</a>
            </Link>
          </li>
          <li className='py-4 px-2 hover:font-bold list-none hover:text-blue-400 hover:border-b-4 hover:border-blue-400'>
            <Link href='/hr-members'>
              <a>衆議院議員</a>
            </Link>
          </li>
          <li className='py-4 px-2 hover:font-bold list-none hover:text-blue-400 hover:border-b-4 hover:border-blue-400'>
            <Link href='/hc-members'>
              <a>参議院議員</a>
            </Link>
          </li>
          <li className='py-4 px-2 hover:font-bold list-none hover:text-blue-400 hover:border-b-4 hover:border-blue-400'>
            <Link href='/political-parties'>
              <a>政党別国会議員</a>
            </Link>
          </li>
          <Link href='/login'>
            <button className='bg-blue-500 hover:bg-blue-300 text-white rounded-lg px-4 py-2 m-2'>
              ログイン
            </button>
          </Link>
        </ul>
      </nav> */}
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout2;
