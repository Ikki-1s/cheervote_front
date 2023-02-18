import { css } from '@emotion/react';
import { color, typography } from 'styles/theme';

const style = css`
  width: 100%;
  padding: 8px 40px;
  position: absolute;
  bottom: 0;
  background: ${color.gray};
  ${typography.sm};
`;

const Footer = () => {
  return (
    <footer css={style}>
      <p>©2023 CHEERVOTE</p>
    </footer>
  );
};

export default Footer;
