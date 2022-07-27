import Link from 'next/link';
import { ReactNode } from 'react';

export const siteTitle = 'CHEERVOTE';

const Layout2 = ({ children }: { children: ReactNode }) => {
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
          <Link href='/login'>
            <button className='bg-blue-500 hover:bg-blue-300 text-white rounded-lg px-4 py-2 m-2'>
              ログイン
            </button>
          </Link>
        </ul>
      </nav>
      <main>{children}</main>
    </>
  );
};

export default Layout2;
