import { css } from '@emotion/react';

/* カラー */
export const color = {
  blue: {
    normal: '#30ADD1',
    hover: '#B2D9E4',
  },
  pink: {
    normal: '#E1877A',
    hover: '#E0B1AA',
  },
  yellow: '#F7C646',
  deepBluePurple: '#2A597C', // for default text color
  gray: '#D8D8D8',
  white: '#FFFFFF',
  black: '#000000',
  text: {
    normal: '#2A597C', // same colorcode as deepBluePurple
    white: '#FFFFFF', // same colorcode as white
    disabled: '#AAAAAB', // deep gray
  },
  background: {
    normal: '#F2F6FF', // sky blue
    disabled: '#C6CDCF',
  },
  pieChart: {
    // pink
    liteGreen: '#ADBF3D',
    // yellow
    // blue
    // deepBluePurple
  },
};

/* タイポグラフィ（フォントサイズ） */
const bold = css`
  font-weight: 700;
`;
const heading1 = css`
  font-size: 48px;
  ${bold};
`;
const heading2 = css`
  font-size: 32px;
  ${bold};
`;
const heading3 = css`
  font-size: 24px;
`;
const lg = css`
  font-size: 18px;
`;
const md = css`
  font-size: 16px;
`;
const sm = css`
  font-size: 14px;
`;
const xs = css`
  font-size: 12px;
`;

export const typography = {
  heading1: heading1,
  heading2: heading2,
  heading3: heading3,
  lg: lg,
  md: md,
  sm: sm,
  xs: xs,
  bold: bold,
};
