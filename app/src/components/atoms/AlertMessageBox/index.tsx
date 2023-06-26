import { css } from '@emotion/react';
import { ReactNode } from 'react';

const styles = {
  alert: css`
    text-align: center;
    border: 2px solid #f87171;
    border-radius: 0.25rem;
    background-color: #fee2e2;
    padding: 0.75rem 1rem;
    color: #b91c1c;
  `,
};

const AlertMessageBox = ({ children }: { children: ReactNode }) => {
  return (
    <div css={styles.alert} role='alert'>
      {children}
    </div>
  );
};

export default AlertMessageBox;
