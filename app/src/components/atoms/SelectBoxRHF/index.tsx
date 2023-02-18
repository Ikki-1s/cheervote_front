import { css } from '@emotion/react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { color } from 'styles/theme';

const styles = {
  selectWrap: css`
    /* selectの親要素をアイコン配置の基準とする */
    position: relative;
    display: block;
    /* width: max-content; */
    width: 100%;
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
    width: 100%;
    /* width: max-content; */
    color: ${color.text.normal};
    padding: 8px 40px 8px 20px;
    border-radius: 4px;
    border: 1px solid ${color.paleGray};
    &:disabled {
      /* opacity: 0.5; */
      color: ${color.text.disabled};
      cursor: default;
    }
  `,
};

type SelectBoxRHFProps = {
  select: {
    id?: string; // htmlForと対応
    register?: UseFormRegisterReturn<any>;
    isDisabled?: boolean;
  };
  selectOption: {
    isSetHidden?: boolean; // 「選択してください」といったそれ自体は選択不可の初期表示を行うかどうか
    hiddenTitle?: string; // 選択不可初期表示の表示タイトル
    optionList?:
      | {
          key?: string | number;
          value: string | number;
          label: string;
        }[]
      | undefined;
  };
};

// React Hook Form内で使用する前提のセレクトボックス（非制御コンポーネント）
// 制御コンポーネントで使用する場合はmolecules/SelectBoxを使用
const SelectBoxRHF = ({ select, selectOption }: SelectBoxRHFProps) => {
  return (
    <div css={styles.selectWrap}>
      <select
        id={select.id}
        {...(select.register && select.register)}
        {...(select.isDisabled && { disabled: true })}
        css={styles.select}
      >
        {selectOption.isSetHidden && (
          <option value='' hidden>
            {selectOption.hiddenTitle ? selectOption.hiddenTitle : '選択してください'}
          </option>
        )}
        {selectOption.optionList?.map(({ key, value, label }) => (
          <option key={key ? key : value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectBoxRHF;
