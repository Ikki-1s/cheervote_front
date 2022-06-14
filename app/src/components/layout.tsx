import Link from 'next/link';

export const siteTitle = 'CHEERVOTE';

export default function Layout({ children }: { children: any }) {
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
            <Link href='/hr_members'>
              <a>衆議院議員</a>
            </Link>
          </li>
          <li className='py-4 px-2 hover:font-bold list-none hover:text-blue-400 hover:border-b-4 hover:border-blue-400'>
            <Link href='/hc_members'>
              <a>参議院議員</a>
            </Link>
          </li>
          <li className='py-4 px-2 hover:font-bold list-none hover:text-blue-400 hover:border-b-4 hover:border-blue-400'>
            <Link href='/political_parties'>
              <a>政党別国会議員</a>
            </Link>
          </li>
        </ul>
      </nav>
      <main>{children}</main>
    </>
  );
}
