import { css } from '@emotion/react';
import { color, fontWeight, typography } from 'styles/theme';

const styles = {
  wrap: css`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px 40px 28px;
    background: ${color.white};
    width: 100%;
    max-width: 1014px;
    ${typography.sm}
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.04);
  `,
  userNameWrap: css`
    display: flex;
    gap: 5px;
  `,
  userName: css`
    ${typography.sm}
    ${fontWeight.bold}
  `,
  myConstituencyWrap: css`
    display: flex;
    align-items: flex-start;
    width: 100%;
  `,
  myConstituency: css`
    ${typography.md}
    ${fontWeight.bold}
    width: 16%;
    padding-right: 20px;
  `,
  housesWrap: css`
    display: flex;
    width: 84%;
    justify-content: space-around;
  `,
  houseWrap: css`
    display: flex;
    flex-direction: column;
    gap: 4px;
    &:last-of-type {
      margin-right: 5%;
    }
  `,
  house: css`
    padding: 0 4px;
    width: fit-content;
    border-bottom: 3px solid ${color.gray};
  `,
  areaWrap: css`
    display: flex;
    align-items: center;
    gap: 30px;
    margin-left: 5px;
  `,
  areaTitle: css`
    ${typography.xs}
    width: 48px;
  `,
  areaName: css`
    ${typography.lg}
    ${fontWeight.bold}
  `,
  separator: css`
    background-color: ${color.gray};
    width: 1px;
    height: 91px;
    margin: 0 4%;
  `,
};

type UserConstituencyViewProps = {
  userName: string;
  myConstituency: {
    hrConstituency: string;
    hrPrBlock: string;
    hcConstituency: string;
  };
};

// ログイン時TOP表示のログインユーザーのマイ選挙区情報
const UserConstituencyView = ({ userName, myConstituency }: UserConstituencyViewProps) => {
  return (
    <div css={styles.wrap}>
      <div css={styles.userNameWrap}>
        <span css={styles.userName}>{userName}</span>さん
      </div>
      <div css={styles.myConstituencyWrap}>
        <div css={styles.myConstituency}>マイ選挙区</div>
        <div css={styles.housesWrap}>
          <div css={styles.houseWrap}>
            <div css={styles.house}>衆議院</div>
            <div css={styles.areaWrap}>
              <span css={styles.areaTitle}>小選挙区</span>
              <span css={styles.areaName}>{myConstituency.hrConstituency}</span>
            </div>
            <div css={styles.areaWrap}>
              <span css={styles.areaTitle}>比例</span>
              <span css={styles.areaName}>{`${myConstituency.hrPrBlock}ブロック`}</span>
            </div>
          </div>
          <div css={styles.separator}></div>
          <div css={styles.houseWrap}>
            <div css={styles.house}>参議院</div>
            <div css={styles.areaWrap}>
              <span css={styles.areaTitle}>選挙区</span>
              <span css={styles.areaName}>{myConstituency.hcConstituency}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserConstituencyView;
