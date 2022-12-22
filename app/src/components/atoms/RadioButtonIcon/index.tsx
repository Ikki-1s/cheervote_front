import { css } from '@emotion/react';
import { ReactNode } from 'react';

// const style = css`
//   opacity: 0;
//   position: absolute;
//   & + span {
//     display: inline-block;
//     position: relative;
//     margin: 0 2em 0 0;
//     padding: 0.3em 0.3em 0.3em 2em;
//     line-height: 1;
//     vertical-align: middle;
//     cursor: pointer;
//   }
//   & + span:before {
//     content: '';
//     position: absolute;
//     top: 0.25em;
//     left: 0;
//     width: 1.375em;
//     height: 1.375em;
//     border: 1px solid #999;
//     border-radius: 50%;
//     line-height: 1;
//     background: #fff;
//   }
//   & + span:after {
//     content: '';
//     display: none;
//   }
//   &:checked + span:after {
//     display: block;
//     position: absolute;
//     top: 0.45em;
//     left: 0.2em;
//     width: 1.1em;
//     height: 1.1em;
//     margin: 0;
//     padding: 0;
//     border-radius: 50%;
//     background: #3d98b4;
//     line-height: 1;
//   }
//   &:focus + span {
//     outline: 1px solid #ccc;
//   }
// `;

const style = css`
  opacity: 0;
  position: absolute;
  /* appearance: none; */
  /* display: none; */
  /* width: 1px; */
  /* height: 1px; */
  & + span {
    display: inline-block;
    position: relative;
    vertical-align: middle;
    cursor: pointer;
    /* padding: 9px 11px 10px 36px; */
    padding: 0.3em 2em 0.3em 3em;
    /* border-radius: 4px; */
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
  children: ReactNode;
};

const RadioButtonIcon = (props: Props) => {
  const { id, value, children } = props;
  return (
    <label>
      <input type='radio' id={id} value={value} css={style} />
      <span>{children}</span>
    </label>
  );
};

export default RadioButtonIcon;
