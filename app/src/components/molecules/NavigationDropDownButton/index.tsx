import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { css } from '@emotion/react';
import { color, typography } from 'styles/theme';
import UserIcon from '../../atoms/UserIcon';
import { AdjustStringLength } from 'utils/adjustStringLength';

const styles = {
  dropDownButton: css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    gap: 6px;
    background: ${color.background.normal};
    border-radius: 6px;
    color: ${color.text.normal};
    width: max-content;
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
  userIconWrap: css`
    display: flex;
    align-items: center;
    padding-right: 4px;
  `,
  children: css`
    display: flex;
    flex-direction: column;
    position: absolute;
    /* top: 46px; */
    top: 40.25px;
    border-radius: 3px;
    box-shadow: ${color.gray} 0px 3px 10px;
    width: 100%;
    min-width: max-content;
  `,
  container: css`
    position: relative;
  `,
};

type Props = {
  title: string;
  width?: number;
  height?: number;
  fontSize?: keyof typeof typography;
  containerFlexEnd?: boolean;
  withUserIcon?: boolean;
  userIconSrc?: string | null;
  titleMaxLength?: number;
  addCharacter?: string;
  children?: ReactNode;
};

const NavigationDropDownButton = ({
  title,
  width,
  height,
  fontSize,
  containerFlexEnd,
  withUserIcon,
  userIconSrc,
  titleMaxLength,
  addCharacter,
  children,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);

  const addButtonStyles = css`
    ${width && `width: ${width}px`};
    ${height && `height: ${height}px`};
    ${fontSize && typography[fontSize]};
  `;

  const addContainerStyles = css`
    ${containerFlexEnd &&
    css`
      display: flex;
      justify-content: flex-end;
    `};
  `;

  let adjustTitle: string;
  if (titleMaxLength) {
    adjustTitle = addCharacter
      ? AdjustStringLength(title, titleMaxLength, addCharacter)
      : AdjustStringLength(title, titleMaxLength);
  } else {
    adjustTitle = title;
  }

  const handleDocumentClick = useCallback(
    (e: MouseEvent | TouchEvent) => {
      // 自分自身をクリックした場合は何もしない
      if (dropDownRef.current) {
        const elements = dropDownRef.current.querySelectorAll('*');
        for (let i = 0; i < elements.length; i++) {
          if (elements[i] === e.target) {
            return;
          }
        }
      }
      setIsOpen(false);
    },
    [dropDownRef],
  );

  const handleMouseDown = (e: React.SyntheticEvent) => {
    // e.stopPropagation();
    setIsOpen((isOpen) => !isOpen);
  };

  useEffect(() => {
    // 画面外クリック・タッチのイベントを設定
    document.addEventListener('click', handleDocumentClick, false);
    document.addEventListener('touchend', handleDocumentClick, false);

    return function cleanup() {
      document.removeEventListener('click', handleDocumentClick, false);
      document.removeEventListener('touchend', handleDocumentClick, false);
    };
  });

  return (
    <div css={[styles.container, addContainerStyles]} ref={dropDownRef}>
      <button
        type='button'
        css={[styles.dropDownButton, addButtonStyles]}
        // onMouseDown={handleMouseDown}
        // onTouchEnd={handleMouseDown}
        onClick={handleMouseDown}
      >
        {withUserIcon && (
          <span css={styles.userIconWrap}>
            {userIconSrc ? (
              <UserIcon iconSrc={userIconSrc} widthAndHeight={33.25} />
            ) : (
              <UserIcon widthAndHeight={33.25} />
            )}
          </span>
        )}
        {adjustTitle}
      </button>
      {isOpen && (
        <div css={styles.children} onClick={handleMouseDown}>
          {children}
        </div>
      )}
    </div>
  );
};

export default NavigationDropDownButton;
