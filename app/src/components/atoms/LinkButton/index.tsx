import styled from '@emotion/styled';
import { color, typography } from 'styles/theme';

type Props = {
  fontSize?: keyof typeof typography;
  bold?: boolean;
};

const LinkButton = styled.a<Props>`
  ${(props) => (props.fontSize ? typography[props.fontSize] : typography.md)}
  ${(props) => props.bold && typography.bold}
  padding: 10px;
  border-radius: 6px;
  &:hover {
    cursor: pointer;
    background: ${color.blue.hover};
  }
`;

export default LinkButton;
