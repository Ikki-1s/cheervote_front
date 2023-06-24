import styled from '@emotion/styled';
import { color, fontWeight, typography } from 'styles/theme';

type Props = {
  fontSize?: keyof typeof typography;
  bold?: boolean;
  width?: number;
  height?: number;
  paddingLR?: number;
  widthMaxContent?: boolean;
};

const LinkButton = styled.a<Props>`
  ${(props) => (props.fontSize ? typography[props.fontSize] : typography.md)}
  ${(props) => props.bold && fontWeight.bold}
  ${(props) => props.width && `width: ${props.width}px;`}
  ${(props) => props.height && `height: ${props.height}px;`}
  ${(props) => (props.paddingLR ? `padding: 10px ${props.paddingLR}px;` : 'padding: 10px;')}
  ${(props) => props.widthMaxContent && 'width: max-content;'}
  border-radius: 6px;
  text-align: center;
  &:hover {
    cursor: pointer;
    background: ${color.blue.hover};
  }
`;

export default LinkButton;
