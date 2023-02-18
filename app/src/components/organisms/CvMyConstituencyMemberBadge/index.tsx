import { css } from '@emotion/react';
import { color, fontWeight, typography } from 'styles/theme';

const styles = {
  wrap: css`
    display: flex;
    gap: 28px;
  `,
  badge: {
    base: css`
      padding: 2px 20px;
      border-radius: 4px;
      min-width: 152px;
      height: 28px;
    `,
    isMember: css`
      ${typography.md}
      ${fontWeight.medium}
      color: ${color.white};
      background-color: ${color.yellow};
    `,
    isNotMember: css`
      ${typography.md}
      ${fontWeight.regular}
      color: ${color.text.disabled};
      background-color: ${color.background.disabled};
    `,
  },
  sentence: {
    isMember: css`
      ${typography.md}
      ${fontWeight.bold}
      color: ${color.deepBluePurple};
    `,
    isNotMember: css`
      ${typography.md}
      color: ${color.deepBluePurple};
    `,
  },
};

type CvMyConstituencyMemberBadgeProps = {
  style: 'isMember' | 'isNotMember';
};

const CvMyConstituencyMemberBadge = ({ style }: CvMyConstituencyMemberBadgeProps) => {
  const sentence =
    style === 'isMember'
      ? 'マイ選挙区の議員のためあなたはこの議員に評価の投票が出来ます'
      : 'マイ選挙区の議員ではありません';

  return (
    <div css={styles.wrap}>
      <div css={[styles.badge.base, styles.badge[style]]}>マイ選挙区議員</div>
      <div css={styles.sentence[style]}>{sentence}</div>
    </div>
  );
};

export default CvMyConstituencyMemberBadge;
