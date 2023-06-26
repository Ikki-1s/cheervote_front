import LinkButton from 'components/atoms/LinkButton';
import Layout from 'components/templates/common/Layout';
import Link from 'next/link';

const Settings = () => {
  return (
    <Layout>
      <h1>アカウント設定</h1>
      <h2>アカウントの削除</h2>
      <Link href='/settings/delete-account' passHref>
        <LinkButton widthMaxContent>アカウントを削除する</LinkButton>
      </Link>
    </Layout>
  );
};

export default Settings;
