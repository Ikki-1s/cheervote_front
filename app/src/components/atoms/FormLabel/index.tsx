import { css } from '@emotion/react';
import { ReactNode } from 'react';
import { fontWeight } from 'styles/theme';

const styles = {
  label: css`
    ${fontWeight.medium}
  `,
};

type FormLabelProps = {
  htmlFor?: string;
  children: ReactNode;
};

const FormLabel = ({ htmlFor, children }: FormLabelProps) => {
  return (
    <label css={styles.label} {...(htmlFor && { htmlFor: htmlFor })}>
      {children}
    </label>
  );
};

export default FormLabel;
