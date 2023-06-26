import { useContext, useState } from 'react';
import { useSWRConfig } from 'swr';
import { css } from '@emotion/react';
import { color, fontWeight } from 'styles/theme';
import { deleteUser } from 'domains';
import { destroyClientSideCookie } from 'utils';
import { CurrentUserContext } from 'stores/CurrentUserProvider';
import AlertMessageBox from 'components/atoms/AlertMessageBox';
import ColorButton from 'components/atoms/ColorButton';
import ReplacementText from 'components/atoms/ReplacementText';

const styles = {
  textWrap: {
    base: css`
      line-height: 1.8em;
      ${fontWeight.bold};
    `,
    beforeDelete: css`
      color: ${color.dangerousRed.normal};
    `,
    afterDelete: css``,
  },
};

const DeleteAccountMessage = () => {
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false);
  const { setCurrentUser } = useContext(CurrentUserContext);
  const { cache } = useSWRConfig();

  const onSubmit = async () => {
    try {
      const res = await deleteUser();
      if (res && res.data.status === 'success') {
        destroyClientSideCookie();
        setCurrentUser(undefined);
        setIsDeleted(true);
        cache.delete('/signed_in_homes');
      } else {
        // Cookieにアクセストークンがなかった場合
        console.log('アクセストークンがありません');
        destroyClientSideCookie();
        setAlertMessageOpen(true);
      }
    } catch (err) {
      console.log('catch error');
      console.log(err);
      destroyClientSideCookie();
      setAlertMessageOpen(true);
    }
  };

  return !isDeleted ? (
    <ReplacementText gap={50} alignItems='center'>
      <p css={[styles.textWrap.base, styles.textWrap.beforeDelete]}>
        アカウントを削除すると、二度と元に戻すことはできません。
        <br />
        本当に削除される場合は、以下のボタンを押すとアカウントを削除します。
      </p>
      {alertMessageOpen && (
        <AlertMessageBox>エラーが発生しました。ブラウザを更新してください</AlertMessageBox>
      )}
      <ColorButton onClick={onSubmit} color='dangerousRed' marginTop={40} fontSize='lg' width={300}>
        アカウントを削除する
      </ColorButton>
    </ReplacementText>
  ) : (
    <ReplacementText gap={50} alignItems='center'>
      <p css={styles.textWrap}>
        アカウントを削除しました。
        <br />
        今までCHEERVOTEをご利用いただきありがとうございました。
      </p>
    </ReplacementText>
  );
};

export default DeleteAccountMessage;
