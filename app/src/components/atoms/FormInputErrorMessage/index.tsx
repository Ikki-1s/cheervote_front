import { css } from '@emotion/react';
import { typography } from 'styles/theme';

const styles = {
  alert: css`
    ${typography.sm}
    color: #ef4444;
    height: 1.5rem;
  `,
};

type FormInputErrorMessageProps = {
  title: string;
};

const FormInputErrorMessage = ({ title }: FormInputErrorMessageProps) => {
  return <div css={styles.alert}>{title}</div>;
};

export default FormInputErrorMessage;
