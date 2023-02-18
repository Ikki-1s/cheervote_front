import { ReactNode } from 'react';
import { css } from '@emotion/react';

const style = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 92%;
  max-width: 1152px;
  margin: 0 auto;
`;

const MainContainer = ({ children }: { children: ReactNode }) => {
  return <div css={style}>{children}</div>;
};

export default MainContainer;
