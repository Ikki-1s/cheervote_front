import { css } from '@emotion/react';
import UserIcon from 'components/atoms/UserIcon';
import { color } from 'styles/theme';

const styles = {
  a: css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4px 10px;
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
  children: string;
  url?: string;
  displayLength?: number;
};

const UserDropDownMenu = ({ children, url = '#', displayLength = 15 }: Props) => {
  let userName;
  if (children.length > displayLength) {
    userName = children.substring(0, displayLength) + '...';
  } else {
    userName = children;
  }

  return (
    <a href={url} css={styles.a}>
      <UserIcon />
      <span css={styles.span}>{userName}</span>
    </a>
  );
};

export default UserDropDownMenu;
