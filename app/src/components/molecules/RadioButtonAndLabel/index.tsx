import { css } from '@emotion/react';
import { ReactNode } from 'react';

const style = css`
  opacity: 0;
  position: absolute;
  & + span {
    display: inline-block;
    position: relative;
    vertical-align: middle;
    cursor: pointer;
    padding: 0.3em 2em 0.3em 3em;
    font-weight: 500;
  }
  & + span::before,
  & + span::after {
    content: '';
    position: absolute;
    display: block;
    top: 0;
    bottom: 0;
    border-radius: 50%;
    margin: auto 10px auto 0;
    box-sizing: border-box;
  }
  & + span::before {
    width: 30px;
    height: 30px;
    background: #fff;
    border: 2px solid #999999;
    left: 9px;
  }
  &:checked + span::before {
    border: 2px solid #0070bd;
  }
  & + span::after {
    width: 20px;
    height: 20px;
    background: #999999;
    left: 14px;
    opacity: 0;
  }
  &:checked + span::after {
    background: #0070bd;
  }

  &:checked + span::after {
    opacity: 1;
  }
`;

type Props = {
  id: string;
  value: string;
  register?: {};
  children: ReactNode;
};

const RadioButtonAndLabel = (props: Props) => {
  const { id, value, register, children } = props;
  return (
    <label>
      <input type='radio' id={id} value={value} css={style} {...register} />
      <span>{children}</span>
    </label>
  );
};

export default RadioButtonAndLabel;
