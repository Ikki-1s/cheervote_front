import { css } from '@emotion/react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { typography } from 'styles/theme';

const styles = {
  input: css`
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    padding: 8px 20px 8px 20px;
    border-radius: 4px;
    border: 1px solid #ccc;
    ${typography.md}
  `,
};

type InputProps = {
  id?: string;
  type: 'text' | 'number' | 'tel' | 'email' | 'url' | 'password' | 'search';
  name?: string; // register付ける場合はname属性付いてるので不要
  register?: UseFormRegisterReturn<any>; // React Hook Formを用いる場合に設定
};

const Input = ({ id, type, name, register }: InputProps) => {
  return (
    <input
      {...(id && { id: id })}
      type={type}
      {...(name && { name: name })}
      css={styles.input}
      {...(register && register)}
    />
  );
};

export default Input;
