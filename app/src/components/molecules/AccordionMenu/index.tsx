import { css } from '@emotion/react';
import { useState } from 'react';
import { color, typography } from 'styles/theme';

const styles = {
  closedMenu: css`
    display: flex;
    /* justify-content: center; */
    align-items: center;
    padding: 14px 20px;
    gap: 20px;
    width: 1014px;
    height: 54px;
    background: ${color.blue.normal};
    border-radius: 6px;
    color: ${color.text.white};
    ${typography.lg};
    font-weight: 500;
    cursor: pointer;
    &:before {
      content: '';
      width: 10px;
      height: 10px;
      margin: 0 0 0 10px;
      border-right: 2.5px solid ${color.text.white};
      border-bottom: 2.5px solid ${color.text.white};
      -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
      transform: rotate(45deg);
      transition: transform 0.3s; /* transformに動きをつける */
    }
  `,
  openedMenu: css`
    border-radius: 6px 6px 0px 0px;
    &:before {
      transform: rotate(-135deg) translateX(-40%) translateY(-40%);
      /* transform: rotate(-135deg); */
    }
  `,
};

type Props = {
  children: string;
};

const AccordionMenu = ({ children }: Props) => {
  const [opened, setOpened] = useState(false);

  const handleClick = () => {
    setOpened(!opened);
  };

  return (
    <div
      onClick={handleClick}
      css={opened ? [styles.closedMenu, styles.openedMenu] : styles.closedMenu}
    >
      {children}
    </div>
  );
};

export default AccordionMenu;
