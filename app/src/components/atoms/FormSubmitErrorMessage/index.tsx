import { css } from '@emotion/react';

const styles = {
  alert: css`
    width: 100%;
    text-align: justify;
    border: 1px solid #f87171;
    border-radius: 0.25rem;
    background-color: #fee2e2;
    padding: 0.5rem 1rem;
    color: #b91c1c;
  `,
};

type FormSubmitErrorMessageProps = {
  children: string;
};

const FormSubmitErrorMessage = ({ children }: FormSubmitErrorMessageProps) => {
  return (
    <div css={styles.alert} role='alert'>
      {children}
    </div>
  );
};

export default FormSubmitErrorMessage;
