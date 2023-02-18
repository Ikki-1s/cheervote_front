import { css } from '@emotion/react';
import UserIcon from 'components/atoms/UserIcon';
import { color } from 'styles/theme';
import { AdjustStringLength } from 'utils/adjustStringLength';

const styles = {
  dropDownButton: css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4px 10px;
    background: ${color.background.normal};
    border-radius: 6px;
    color: ${color.text.normal};
    &:hover {
      background: ${color.blue.hover};
      border-radius: 6px;
    }
    &:after {
      content: '';
      width: 8px;
      height: 8px;
      margin: 0 0 0 10px;
      border-right: 2px solid ${color.deepBluePurple};
      border-bottom: 2px solid ${color.deepBluePurple};
      -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
    }
  `,
  span: css`
    padding-left: 5px;
  `,
};

type Props = {
  userName: string;
  url?: string;
  displayLength?: number;
};

///////// 廃止(ecosystemsに変更予定) /////////////////
const UserDropDownMenu = ({ userName, url = '#', displayLength = 15 }: Props) => {
  return (
    <button css={styles.dropDownButton}>
      <UserIcon iconSrc='/UserImage.png' />
      <span css={styles.span}>{AdjustStringLength(userName, displayLength, '...')}</span>
    </button>
  );
};

export default UserDropDownMenu;
