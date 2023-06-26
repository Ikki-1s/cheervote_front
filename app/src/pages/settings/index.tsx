import { NextPage } from 'next';
import Meta from 'components/organisms/Meta';
import Template from 'components/templates/settings/Settings';
import useCheckSignedIn from 'hooks/useCheckSignedIn';

const Settings: NextPage = () => {
  if (!useCheckSignedIn()) return <></>;

  return (
    <>
      <Meta pageTitle='アカウント設定' pageDesc='アカウント設定ページです。' />
      <Template />
    </>
  );
};

export default Settings;
