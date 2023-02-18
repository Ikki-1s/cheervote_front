import Image from 'next/image';
import Link from 'next/link';
import { css } from '@emotion/react';
import { typography } from 'styles/theme';
import Layout from 'components/templates/common/Layout';
import ColorButton from 'components/atoms/ColorButton';

const styles = {
  wrap: css`
    display: flex;
    flex-direction: column;
  `,
  imageAndOverlapTextWrap: css`
    position: relative;
  `,
  image: css`
    position: relative;
    width: 100%;
    height: 600px;
    @media (max-width: 1200px) {
      height: 500px;
    }
    @media (max-width: 992px) {
      height: 450px;
    }
    @media (max-width: 768px) {
      height: 400px;
    }
  `,
  overlapText: css`
    position: absolute;
    width: 864px;
    top: 20%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    margin-top: 0;
    ${typography.heading1}
    @media (max-width: 1200px) {
      width: 720px;
      font-size: 40px;
    }
    @media (max-width: 992px) {
      width: 648px;
      font-size: 36px;
    }
    @media (max-width: 768px) {
      width: 576px;
      ${typography.heading2}
    }
    @media (max-width: 596px) {
      width: 90%;
      font-size: 28px;
    }
  `,
  subtitleAndPWrap: css`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 38px;
    max-width: 760px;
    width: 84%;
    margin: 40px auto;
  `,
  pWrap: css`
    p {
      line-height: 1.9;
      text-align: justify;
      margin-top: 30px;
      ${typography.lg}
      @media (max-width: 768px) {
        ${typography.md}
      }
      &:first-of-type {
        margin-top: 0px;
      }
    }
  `,
};

const BeforeSigninHome = () => {
  return (
    <Layout isNotAppliedMainContainer>
      <div css={styles.wrap}>
        {/* <Image src='/Top.jpg' alt='Top' layout='responsive' width={1440} height={703} priority /> */}
        <div css={styles.imageAndOverlapTextWrap}>
          <div css={styles.image}>
            <Image src='/Top.jpg' alt='Top' layout='fill' objectFit='cover' priority />
          </div>
          <h1 css={styles.overlapText}>
            あなたは自分の地域の国会議員の
            <br />
            普段の活動をチェックできていますか？
          </h1>
        </div>
        <div css={styles.subtitleAndPWrap}>
          <h2>定期的に国会議員の活動をチェックして評価しよう</h2>
          <Link href='/signup' passHref>
            <ColorButton
              color='pink'
              fontSize='heading3'
              fontWeight='medium'
              paddingTop={12}
              paddingBottom={12}
              paddingLeft={20}
              paddingRight={20}
              width={232}
            >
              今すぐ投票する
              <br />
              （ユーザー登録）
            </ColorButton>
          </Link>
          <div css={styles.pWrap}>
            <p>
              当サイトは、自分の住む地域（選挙区）から選出された国会議員の普段の活動をチェックし
              定期的に評価しようというサイトです。
            </p>
            <p>ユーザー登録をすると、一か月単位で実施する議員の評価アンケートに投票できます。</p>
            <p>
              評価できる議員はユーザー登録時に選択した、自分の住む地域（選挙区）から選出された国会議員（※）に限られます。
            </p>
            <p>集計結果は各議員のページにて確認することができます。</p>
            <p>
              （※）現在は衆議院小選挙区選出議員、参議院選挙区選出議員のみ。
              今後比例選出議員についても評価をできるよう検討中です。
            </p>
          </div>
        </div>
        <div css={styles.subtitleAndPWrap}>
          <h2>評価の投票で有権者の声を届けよう</h2>
          <div css={styles.pWrap}>
            <p>
              選挙には行くけれど、当選した地元の国会議員の選挙以降の普段の活動は知らない、チェックしていないという人は多いのではないでしょうか？
            </p>
            <p>
              議員本人にとっては当選することが最も重要かもしれませんが、有権者にとっては当選した後にしっかり国民のために仕事をしてくれていることが何より重要です。
            </p>
            <p>
              しかし、チェックしている人が少なければ、選挙さえ当選すれば普段は適当な仕事をしていてもいいと考えたり、有権者全体の利益よりも特定の人や団体の利益を優先した仕事をしたりするかもしれません。
            </p>
            <p>
              また一方で、せっかく頑張って仕事をしている議員であっても、とりわけ当選・落選に関わる地元の有権者に普段からその仕事ぶりが褒められないのであれば、頑張るモチベーションを段々と失っていくかもしれません。
            </p>
            <p>
              当サイトはこのような問題意識から、有権者のユーザーの皆様には定期的に是々非々で評価の投票をしていただくことを通じて普段から議員の活動をチェックする習慣をつけ有権者としてのリテラシーを高める助けにしていただくと同時に、現役議員の方々に対しては「これだけの有権者があなたの活動をチェックしているぞ、しっかり頑張ってください！」という有権者の声を届けようという試みです。
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BeforeSigninHome;
