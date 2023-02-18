import Image from 'next/image';
import { css } from '@emotion/react';
import UserDefaultIcon from '/public/UserIcon.svg';

type Props = {
  iconSrc?: string;
  widthAndHeight?: number;
};

const UserIcon = ({ iconSrc, widthAndHeight = 38 }: Props) => {
  return (
    <>
      {iconSrc ? (
        <Image
          src={iconSrc}
          alt='ユーザーアイコン'
          width={38}
          height={38}
          css={css`
            border-radius: 50%;
          `}
        />
      ) : (
        <UserDefaultIcon width={widthAndHeight} height={widthAndHeight} />
      )}
    </>
  );
};

export default UserIcon;
