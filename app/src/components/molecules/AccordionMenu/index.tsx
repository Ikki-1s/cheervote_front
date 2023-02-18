import { css } from '@emotion/react';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { color, typography } from 'styles/theme';

const menuStyles = {
  closedMenu: css`
    display: flex;
    align-items: center;
    padding: 14px 20px;
    gap: 20px;
    width: 100%;
    max-width: 1014px;
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
      transition: transform 0.2s; /* transformに動きをつける */
    }
  `,
  openedMenu: css`
    border-radius: 6px 6px 0px 0px;
    &:before {
      transform: rotate(225deg) translateX(-40%) translateY(-40%);
      /* transform: rotate(-135deg) translateX(-40%) translateY(-40%); */
    }
  `,
};

const childrenWrap = css`
  width: 100%;
  max-width: 1014px;

  transition: height 0.2s linear, opacity 0.2s ease-in;
  overflow: hidden;
`;

type Props = {
  title: string;
  defaultIsOpened: boolean;
  children?: ReactNode;
};

const AccordionMenu = ({ title, defaultIsOpened, children }: Props) => {
  const [isOpened, setIsOpened] = useState<boolean>(defaultIsOpened);
  const childrenRef = useRef<HTMLDivElement>(null);
  const [showChildren, setShowChildren] = useState<boolean>(defaultIsOpened);
  const [childrenHeight, setChildrenHeight] = useState<number>(0);

  const updateSize = () => {
    if (childrenRef.current) {
      const height = childrenRef.current?.clientHeight;
      setChildrenHeight(height);
    }
  };

  useEffect(() => {
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const handleClick = () => {
    if (childrenRef.current) {
      setShowChildren(!showChildren);
    }
    setIsOpened(!isOpened);
  };

  return (
    <>
      <button
        onClick={handleClick}
        css={isOpened ? [menuStyles.closedMenu, menuStyles.openedMenu] : menuStyles.closedMenu}
      >
        {title}
      </button>
      <div
        css={[
          childrenWrap,
          css`
            height: ${showChildren ? `${childrenHeight}px` : '0px'};
            opacity: ${showChildren ? 1 : 0};
          `,
        ]}
      >
        <div ref={childrenRef}>{children}</div>
      </div>
    </>
  );
};

export default AccordionMenu;
