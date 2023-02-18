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
  lighGray: '#D3D3D3', // ライトグレー
  paleGray: '#CCCCCC', // 淡いグレー
  darkGray: '#A9A9A9', // ダークグレー
  dullGray: '#999999', // 沈んだグレー
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
export const fontWeight = {
  bold: css`
    font-weight: 700;
  `,
  medium: css`
    font-weight: 500;
  `,
  regular: css`
    font-weight: 400;
  `,
};

const fontSize = {
  heading1: css`
    font-size: 48px;
    ${fontWeight.bold};
  `,
  heading2: css`
    font-size: 32px;
    ${fontWeight.bold};
  `,
  heading3: css`
    font-size: 24px;
  `,
  lg: css`
    font-size: 18px;
  `,
  md: css`
    font-size: 16px;
  `,
  sm: css`
    font-size: 14px;
  `,
  xs: css`
    font-size: 12px;
  `,
  xxs: css`
    font-size: 10px;
  `,
};

export const typography = {
  heading1: fontSize.heading1,
  heading2: fontSize.heading2,
  heading3: fontSize.heading3,
  lg: fontSize.lg,
  md: fontSize.md,
  sm: fontSize.sm,
  xs: fontSize.xs,
  xxs: fontSize.xxs,
};
