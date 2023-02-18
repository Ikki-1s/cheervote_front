import { css, Global } from '@emotion/react';
import resetCSS from 'shokika.css/dist/string';
import { color, typography } from './theme';

const resetStyle = css`
  ${resetCSS};
  html,
  body {
    padding: 0;
    margin: 0;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  button {
    border-style: none;
  }
`;

const baseStyle = css`
  html {
    font-family: 'Noto Sans JP', sans-serif;
  }

  body {
    ${typography.md};
    color: ${color.text.normal};
    background: ${color.background.normal};
  }

  h1 {
    ${typography.heading1};
    margin: 10px 0 0 0;
  }

  h2 {
    ${typography.heading2};
    margin: 30px 0 0 0;
    &:first-of-type {
      margin: 10px 0 0 0;
    }
  }

  h3 {
    ${typography.heading3};
  }
`;

const GrobalStyle = () => <Global styles={[resetStyle, baseStyle]} />;

export default GrobalStyle;
