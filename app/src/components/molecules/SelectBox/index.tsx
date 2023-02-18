import { css } from '@emotion/react';
import React, { useState } from 'react';
import { color, typography } from 'styles/theme';

const styles = {
  selectWrap: css`
    /* selectの親要素をアイコン配置の基準とする */
    position: relative;
    display: block;
    width: max-content;
    &::after {
      /* 矢印アイコン自作 */
      position: absolute;
      right: 10px;
      top: 0;
      bottom: 2px;
      /* bottom: 0; */
      margin: auto;
      content: '';
      display: block;
      width: 8px;
      height: 8px;
      border-right: 2px solid ${color.deepBluePurple};
      border-bottom: 2px solid ${color.deepBluePurple};
      transform: rotate(45deg);
      pointer-events: none; /* 矢印状もクリック可能にする */
    }
  `,
  select: css`
    -webkit-appearance: none;
    appearance: none; /* ブラウザ標準スタイルを解除 */
    display: block;
    /* width: 100%; */
    width: max-content;
    color: ${color.text.normal};
    padding: 7px 40px 7px 15px;
    border-radius: 4px;
    border: 1px solid ${color.paleGray};
  `,
};

export type SelectBoxProps = {
  id?: string;
  option: {
    key?: string | number;
    value: string | number;
    label: string;
  }[];
  defaultSelectValue?: string;
  onChangeAction?: (targetValue: string) => void;
};

// 制御コンポーネント版のセレクトボックス
// React Hook Formと使う場合はatoms/SelectBoxRHFを使用
const SelectBox = ({ id, option, defaultSelectValue, onChangeAction }: SelectBoxProps) => {
  const [selectedValue, SetSelectedValue] = useState<string | number>(
    defaultSelectValue ? defaultSelectValue : option[0].value,
  );

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    SetSelectedValue(e.target.value);
    onChangeAction && onChangeAction(e.target.value);
  };

  return (
    <div css={styles.selectWrap}>
      <select
        {...(id && { id: id })}
        value={selectedValue}
        onChange={handleChange}
        css={styles.select}
      >
        {option.map(({ key, value, label }) => (
          <option key={key ? key : value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectBox;
