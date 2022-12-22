import { ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { User } from 'types';
import { getCurrentUser, signOut } from 'libs/auth';
import { destroyClientSideCookie } from 'libs/cookie';
import { GetServerSideProps } from 'next';

export const siteTitle = 'CHEERVOTE';

const Layout = ({ children }: { children: ReactNode }) => {
  // const [isCookie, setIsCookie] = useState<boolean>(false);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | undefined>();
  const router = useRouter();

  useEffect(() => {
    handleGetCurrentUser();
    // const cookie = parseCookies();
    // console.log(cookie);
    // if (cookie._access_token && cookie._client && cookie._uid) {
    //   setIsCookie(true);
    // }
  }, []);

  const handleGetCurrentUser = async () => {
    try {
      const currentUser = await getCurrentUser();
      // console.log(res);

      if (currentUser?.is_login === true) {
        setIsSignedIn(true);
        setCurrentUser(currentUser?.data);
        // console.log(res?.data.data);
        // } else {
        //   console.log('No current user');
      }
    } catch (err) {
      console.log(err);
    }
  };

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
      <nav className='sticky -top-0 z-50 bg-white dark:bg-gray-800 border-b'>
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
          <li className='py-4 px-2 hover:font-bold list-none hover:text-blue-400 hover:border-b-4 hover:border-blue-400'>
            <Link href='/sandbox'>
              <a>sandbox</a>
            </Link>
          </li>
          {/* {isCookie ? ( */}
          {isSignedIn ? (
            <>
              {currentUser && (
                <li className='py-4 px-2 font-semibold italiclist-none text-gray-600'>
                  {currentUser.name}
                </li>
              )}
              <button
                onClick={handleSignOut}
                className='bg-blue-500 hover:bg-blue-300 text-white rounded-lg px-4 py-2 m-2'
              >
                ログアウト
              </button>
            </>
          ) : (
            <>
              <Link href='/login'>
                <button className='bg-blue-500 hover:bg-blue-300 text-white rounded-lg px-4 py-2 m-2'>
                  ログイン
                </button>
              </Link>
              <Link href='/signup'>
                <button className='bg-red-500 hover:bg-red-300 text-white rounded-lg px-4 py-2 m-2'>
                  ユーザー登録
                </button>
              </Link>
            </>
          )}
        </ul>
      </nav>
      <main>{children}</main>
    </>
  );
};

export default Layout;
