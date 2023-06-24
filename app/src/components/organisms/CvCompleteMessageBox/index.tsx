import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { color, typography } from 'styles/theme';
import LinkButton from 'components/atoms/LinkButton';

const styles = {
  wrap: css`
    display: flex;
    width: 810px;
    min-width: 300px;
    max-width: 810px;
    margin-top: 20px;
    padding: 20px 0px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    border-radius: 6px;
    border-right: 12px solid ${color.pink.normal};
    border-left: 12px solid ${color.pink.normal};
    background: ${color.white};
    box-shadow: 2px 2px 2px 0px ${color.black + '1A'};
    ////// animation //////
    animation-name: zoomin;
    animation-duration: 0.4s;
    animation-timing-function: ease-out;
    animation-fill-mode: forwards;
    @keyframes zoomin {
      0% {
        opacity: 0;
        transform: scale(0.6);
      }
      100% {
        opacity: 1;
        transform: scale(1);
      }
    }
  `,
  titleWrap: css`
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: flex-start;
    gap: 0px 12px;
    align-self: stretch;
    flex-wrap: wrap;
    padding: 0px 10px;
  `,
  titleNormalText: css`
    display: flex;
    color: ${color.pink.normal};
    text-align: center;
    font-size: 40px;
    font-family: Jost;
    font-weight: 600;
    line-height: 160%;
  `,
  titleHighlightText: css`
    display: flex;
    color: ${color.pink.normal};
    text-align: center;
    /* text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1); */
    text-shadow: 2px 2px 2px ${color.black + '1A'};
    font-size: 40px;
    font-family: Jost;
    font-weight: 700;
    line-height: 160%;
  `,
  normalMessage: css`
    ${typography.lg}
  `,
};

const CvCompleteMessageBox = () => {
  const router = useRouter();

  const politicianPagePath = router.query.politician
    ? '/politicians/' + router.query.politician
    : '/';

  return (
    <div css={styles.wrap}>
      <div css={styles.titleWrap}>
        <span css={styles.titleNormalText}>Thank you</span>
        <span css={styles.titleNormalText}>for your</span>
        <span css={styles.titleHighlightText}>CHEERVOTE !</span>
      </div>
      <p css={styles.normalMessage}>評価の投票が完了しました！</p>
      <Link href={politicianPagePath} passHref>
        <LinkButton fontSize='lg' bold>
          投票後の結果確認はこちら
        </LinkButton>
      </Link>
    </div>
  );
};

export default CvCompleteMessageBox;
