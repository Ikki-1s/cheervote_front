import { ReactNode } from 'react';
import { css } from '@emotion/react';

const styles = {
  wrap: css`
    display: flex;
    flex-direction: column;
    margin: 80px 0;
    padding: 0 10px;
    gap: 10px;
  `,
};

type Props = {
  marginTop?: number;
  marginBottom?: number;
  paddingTop?: number;
  paddingBottom?: number;
  paddingRight?: number;
  paddingLeft?: number;
  gap?: number;
  maxWidth?: number;
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'baseline';
  children: ReactNode;
};

const setAddStyles = (props: Props) => {
  return {
    wrap: css`
      ${props.marginTop && `margin-top: ${props.marginTop}px`};
      ${props.marginBottom && `margin-bottom: ${props.marginBottom}px`};
      ${props.paddingTop && `padding-top: ${props.paddingTop}px`};
      ${props.paddingBottom && `padding-bottom: ${props.paddingBottom}px`};
      ${props.paddingRight && `padding-right: ${props.paddingRight}px`};
      ${props.paddingLeft && `padding-left: ${props.paddingLeft}px`};
      ${props.gap && `gap: ${props.gap}px`};
      ${props.maxWidth && `max-width: ${props.maxWidth}px`};
      ${props.alignItems && `align-items: ${props.alignItems}`};
    `,
  };
};

const ReplacementText: React.FC<Props> = (props: Props) => {
  const addStyles = setAddStyles(props);

  return <div css={[styles.wrap, addStyles.wrap]}>{props.children}</div>;
};

export default ReplacementText;
