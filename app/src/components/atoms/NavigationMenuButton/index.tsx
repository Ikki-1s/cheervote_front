import { css } from '@emotion/react';
import Link from 'next/link';
import { ReactNode } from 'react';
import { color } from 'styles/theme';

const baseStyle = css`
  padding: 10px 0px;
  color: ${color.text.normal};
  &:hover {
    border-bottom: 3px solid ${color.blue.normal};
    color: ${color.blue.hover};
  }
`;

const styles = {
  base: css`
    ${baseStyle}
  `,
  selected: css`
    border-bottom: 3px solid ${color.blue.normal};
  `,
};

type Props = {
  children: ReactNode;
  url: string;
  isSelected?: boolean;
};

const NavigationMenuButton = (props: Props) => {
  const { children, url, isSelected } = props;
  return (
    <Link href={url} passHref>
      <a css={isSelected ? [styles.base, styles.selected] : styles.base}>{children}</a>
    </Link>
  );
};

export default NavigationMenuButton;
