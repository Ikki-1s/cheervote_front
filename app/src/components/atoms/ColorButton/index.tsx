import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { color, fontWeight, typography } from 'styles/theme';

const baseStyle = css`
  padding: 10px;
  border-radius: 6px;
  ${typography.md};
  width: 100%;
`;

const customStyles = {
  color: {
    blue: css`
      color: ${color.text.white};
      background: ${color.blue.normal};
      &:hover {
        background: ${color.blue.hover};
      }
    `,
    pink: css`
      color: ${color.text.white};
      background: ${color.pink.normal};
      &:hover {
        background: ${color.pink.hover};
      }
    `,
    disabled: css`
      color: ${color.text.disabled};
      background: ${color.background.disabled};
      cursor: unset;
    `,
  },
};

type Props = {
  color: 'blue' | 'pink' | 'disabled';
  fontSize?: keyof typeof typography;
  fontWeight?: keyof typeof fontWeight;
  padding?: number;
  paddingTop?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  margin?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
  width?: number;
  widthMaxContent?: boolean;
  height?: number;
};

const ColorButton = styled.button<Props>`
  ${baseStyle}
  ${(props) => props.color && customStyles.color[props.color]}
  ${(props) => props.fontSize && typography[props.fontSize]}
  ${(props) => props.fontWeight && fontWeight[props.fontWeight]}
  ${(props) => props.padding && `padding: ${props.padding}px;`}
  ${(props) => props.paddingTop && `padding-top: ${props.paddingTop}px;`}
  ${(props) => props.paddingRight && `padding-right: ${props.paddingRight}px;`}
  ${(props) => props.paddingBottom && `padding-bottom: ${props.paddingBottom}px;`}
  ${(props) => props.paddingLeft && `padding-left: ${props.paddingLeft}px;`}
  ${(props) => props.margin && `margin: ${props.margin}px;`}
  ${(props) => props.marginTop && `margin-top: ${props.marginTop}px;`}
  ${(props) => props.marginRight && `margin-right: ${props.marginRight}px;`}
  ${(props) => props.marginBottom && `margin-bottom: ${props.marginBottom}px;`}
  ${(props) => props.marginLeft && `margin-left: ${props.marginLeft}px;`}
  ${(props) => props.width && `width: ${props.width}px;`}
  ${(props) => props.widthMaxContent && 'width: max-content;'}
  ${(props) => props.height && `height: ${props.height}px;`}
`;

export default ColorButton;
