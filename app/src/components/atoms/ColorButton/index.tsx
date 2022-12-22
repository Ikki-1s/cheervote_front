import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { color, typography } from 'styles/theme';

const baseStyle = css`
  padding: 10px;
  border-radius: 6px;
  ${typography.md};
`;

const colorStyle = {
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
};

type Props = {
  color: 'blue' | 'pink' | 'disabled';
};

const ColorButton = styled.button<Props>`
  ${baseStyle}
  ${(props) => props.color && colorStyle[props.color]}
`;

export default ColorButton;
