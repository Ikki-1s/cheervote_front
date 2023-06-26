import DeleteAccountMessage from 'components/organisms/DeleteAccountMessage';
import Layout from 'components/templates/common/Layout';

const DeleteAccount = () => {
  return (
    <Layout>
      <h1>アカウントの削除</h1>
      <DeleteAccountMessage />
    </Layout>
  );
};

export default DeleteAccount;
