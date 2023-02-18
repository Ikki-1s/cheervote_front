import { css } from '@emotion/react';
import { ReactNode } from 'react';

const style = css`
  display: flex;
  justify-content: center;
`;

const PageCenterWrap = ({ children }: { children: ReactNode }) => {
  return <div css={style}>{children}</div>;
};

export default PageCenterWrap;
