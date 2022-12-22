import { css } from '@emotion/react';
import { ReactNode } from 'react';
import { color } from 'styles/theme';

const style = css`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  &:hover {
    background: ${color.blue.hover};
    border-radius: 6px;
  }
  &:after {
    content: '';
    /* display: inline-block; */
    width: 8px;
    height: 8px;
    margin: 0 0 0 10px;
    border-right: 2px solid ${color.deepBluePurple};
    border-bottom: 2px solid ${color.deepBluePurple};
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`;

type Props = {
  children: ReactNode;
  url: string;
};

const NavigationDropDownButton = ({ children, url }: Props) => {
  return (
    <a href={url} css={style}>
      {children}
    </a>
  );
};

export default NavigationDropDownButton;
