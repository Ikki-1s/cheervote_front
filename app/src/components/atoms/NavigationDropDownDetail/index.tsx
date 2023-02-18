import Link from 'next/link';
import { css } from '@emotion/react';
import { color } from 'styles/theme';

const style = css`
  padding: 10px 20px;
  background-color: ${color.white};
  border-width: 0px 0px 1px 0px;
  border-style: solid;
  border-color: ${color.gray};
  cursor: pointer;
  &:first-of-type {
    border-radius: 3px 3px 0 0;
  }
  &:last-of-type {
    border-width: 0;
    border-radius: 0 0 3px 3px;
  }
  &:only-of-type {
    border-width: 0;
    border-radius: 3px;
  }
  &:hover {
    background-color: ${color.blue.hover};
  }
`;

export type NavigationDropDownDetailProps = {
  title: string;
  url: string;
};

const NavigationDropDownDetail = ({ title, url }: NavigationDropDownDetailProps) => {
  return (
    <Link href={url} passHref>
      <a css={style}>{title}</a>
    </Link>
  );
};

export default NavigationDropDownDetail;
