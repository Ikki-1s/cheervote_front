import Link from 'next/link';
import { css } from '@emotion/react';
import { fontWeight, typography } from 'styles/theme';
import LinkButton from 'components/atoms/LinkButton';

const styles = {
  wrap: css`
    display: flex;
    flex-direction: column;
    padding: 10px;
    gap: 14px;
  `,
  tableRow: css`
    display: flex;
    align-items: flex-start;
    align-content: flex-start;
    gap: 40px;
  `,
  tableHeader: css`
    display: flex;
    justify-content: flex-end;
    min-width: 96px;
  `,
  block: css`
    padding: 5.5px 0px;
    ${fontWeight.bold}
    ${typography.heading3}
  `,
  tableData: css`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    align-content: flex-start;
    gap: 14px 24px;
  `,
};

const HrPrefecturesTable = () => {
  return (
    <div css={styles.wrap}>
      <div css={styles.tableRow}>
        <div css={styles.tableHeader}>
          <div css={styles.block}>北海道</div>
        </div>
        <div css={styles.tableData}>
          <Link href='/hr-members/prefectures/1' passHref>
            <LinkButton fontSize='lg' width={80}>
              北海道
            </LinkButton>
          </Link>
        </div>
      </div>
      <div css={styles.tableRow}>
        <div css={styles.tableHeader}>
          <div css={styles.block}>東北</div>
        </div>
        <div css={styles.tableData}>
          <Link href='/hr-members/prefectures/2' passHref>
            <LinkButton fontSize='lg' width={80}>
              青森県
            </LinkButton>
          </Link>
          <Link href='/hr-members/prefectures/3' passHref>
            <LinkButton fontSize='lg' width={80}>
              岩手県
            </LinkButton>
          </Link>
          <Link href='/hr-members/prefectures/4' passHref>
            <LinkButton fontSize='lg' width={80}>
              宮城県
            </LinkButton>
          </Link>
          <Link href='/hr-members/prefectures/5' passHref>
            <LinkButton fontSize='lg' width={80}>
              秋田県
            </LinkButton>
          </Link>
          <Link href='/hr-members/prefectures/6' passHref>
            <LinkButton fontSize='lg' width={80}>
              山形県
            </LinkButton>
          </Link>
          <Link href='/hr-members/prefectures/7' passHref>
            <LinkButton fontSize='lg' width={80}>
              福島県
            </LinkButton>
          </Link>
        </div>
      </div>
      <div css={styles.tableRow}>
        <div css={styles.tableHeader}>
          <div css={styles.block}>北関東</div>
        </div>
        <div css={styles.tableData}>
          <Link href='/hr-members/prefectures/8' passHref>
            <LinkButton fontSize='lg' width={80}>
              茨城県
            </LinkButton>
          </Link>
          <Link href='/hr-members/prefectures/9' passHref>
            <LinkButton fontSize='lg' width={80}>
              栃木県
            </LinkButton>
          </Link>
          <Link href='/hr-members/prefectures/10' passHref>
            <LinkButton fontSize='lg' width={80}>
              群馬県
            </LinkButton>
          </Link>
          <Link href='/hr-members/prefectures/11' passHref>
            <LinkButton fontSize='lg' width={80}>
              埼玉県
            </LinkButton>
          </Link>
        </div>
      </div>
      <div css={styles.tableRow}>
        <div css={styles.tableHeader}>
          <div css={styles.block}>南関東</div>
        </div>
        <div css={styles.tableData}>
          <Link href='/hr-members/prefectures/12' passHref>
            <LinkButton fontSize='lg' width={80}>
              千葉県
            </LinkButton>
          </Link>
          <Link href='/hr-members/prefectures/14' passHref>
            <LinkButton fontSize='lg' width={80} paddingLR={4}>
              神奈川県
            </LinkButton>
          </Link>
          <Link href='/hr-members/prefectures/19' passHref>
            <LinkButton fontSize='lg' width={80}>
              山梨県
            </LinkButton>
          </Link>
        </div>
      </div>
      <div css={styles.tableRow}>
        <div css={styles.tableHeader}>
          <div css={styles.block}>東京</div>
        </div>
        <div css={styles.tableData}>
          <Link href='/hr-members/prefectures/13' passHref>
            <LinkButton fontSize='lg' width={80}>
              東京都
            </LinkButton>
          </Link>
        </div>
      </div>
      <div css={styles.tableRow}>
        <div css={styles.tableHeader}>
          <div css={styles.block}>北陸信越</div>
        </div>
        <div css={styles.tableData}>
          <Link href='/hr-members/prefectures/15' passHref>
            <LinkButton fontSize='lg' width={80}>
              新潟県
            </LinkButton>
          </Link>
          <Link href='/hr-members/prefectures/16' passHref>
            <LinkButton fontSize='lg' width={80}>
              富山県
            </LinkButton>
          </Link>
          <Link href='/hr-members/prefectures/17' passHref>
            <LinkButton fontSize='lg' width={80}>
              石川県
            </LinkButton>
          </Link>
          <Link href='/hr-members/prefectures/18' passHref>
            <LinkButton fontSize='lg' width={80}>
              福井県
            </LinkButton>
          </Link>
          <Link href='/hr-members/prefectures/20' passHref>
            <LinkButton fontSize='lg' width={80}>
              長野県
            </LinkButton>
          </Link>
        </div>
      </div>
      <div css={styles.tableRow}>
        <div css={styles.tableHeader}>
          <div css={styles.block}>東海</div>
        </div>
        <div css={styles.tableData}>
          <Link href='/hr-members/prefectures/21' passHref>
            <LinkButton fontSize='lg' width={80}>
              岐阜県
            </LinkButton>
          </Link>
          <Link href='/hr-members/prefectures/22' passHref>
            <LinkButton fontSize='lg' width={80}>
              静岡県
            </LinkButton>
          </Link>
          <Link href='/hr-members/prefectures/23' passHref>
            <LinkButton fontSize='lg' width={80}>
              愛知県
            </LinkButton>
          </Link>
          <Link href='/hr-members/prefectures/24' passHref>
            <LinkButton fontSize='lg' width={80}>
              三重県
            </LinkButton>
          </Link>
        </div>
      </div>
      <div css={styles.tableRow}>
        <div css={styles.tableHeader}>
          <div css={styles.block}>近畿</div>
        </div>
        <div css={styles.tableData}>
          <Link href='/hr-members/prefectures/25' passHref>
            <LinkButton fontSize='lg' width={80}>
              滋賀県
            </LinkButton>
          </Link>
          <Link href='/hr-members/prefectures/26' passHref>
            <LinkButton fontSize='lg' width={80}>
              京都府
            </LinkButton>
          </Link>
          <Link href='/hr-members/prefectures/27' passHref>
            <LinkButton fontSize='lg' width={80}>
              大阪府
            </LinkButton>
          </Link>
          <Link href='/hr-members/prefectures/28' passHref>
            <LinkButton fontSize='lg' width={80}>
              兵庫県
            </LinkButton>
          </Link>
          <Link href='/hr-members/prefectures/29' passHref>
            <LinkButton fontSize='lg' width={80}>
              奈良県
            </LinkButton>
          </Link>
          <Link href='/hr-members/prefectures/30' passHref>
            <LinkButton fontSize='lg' width={80} paddingLR={4}>
              和歌山県
            </LinkButton>
          </Link>
        </div>
      </div>
      <div css={styles.tableRow}>
        <div css={styles.tableHeader}>
          <div css={styles.block}>中国</div>
        </div>
        <div css={styles.tableData}>
          <Link href='/hr-members/prefectures/31' passHref>
            <LinkButton fontSize='lg' width={80}>
              鳥取県
            </LinkButton>
          </Link>
          <Link href='/hr-members/prefectures/32' passHref>
            <LinkButton fontSize='lg' width={80}>
              島根県
            </LinkButton>
          </Link>
          <Link href='/hr-members/prefectures/33' passHref>
            <LinkButton fontSize='lg' width={80}>
              岡山県
            </LinkButton>
          </Link>
          <Link href='/hr-members/prefectures/34' passHref>
            <LinkButton fontSize='lg' width={80}>
              広島県
            </LinkButton>
          </Link>
          <Link href='/hr-members/prefectures/35' passHref>
            <LinkButton fontSize='lg' width={80}>
              山口県
            </LinkButton>
          </Link>
        </div>
      </div>
      <div css={styles.tableRow}>
        <div css={styles.tableHeader}>
          <div css={styles.block}>四国</div>
        </div>
        <div css={styles.tableData}>
          <Link href='/hr-members/prefectures/36' passHref>
            <LinkButton fontSize='lg' width={80}>
              徳島県
            </LinkButton>
          </Link>
          <Link href='/hr-members/prefectures/37' passHref>
            <LinkButton fontSize='lg' width={80}>
              香川県
            </LinkButton>
          </Link>
          <Link href='/hr-members/prefectures/38' passHref>
            <LinkButton fontSize='lg' width={80}>
              愛媛県
            </LinkButton>
          </Link>
          <Link href='/hr-members/prefectures/39' passHref>
            <LinkButton fontSize='lg' width={80}>
              高知県
            </LinkButton>
          </Link>
        </div>
      </div>
      <div css={styles.tableRow}>
        <div css={styles.tableHeader}>
          <div css={styles.block}>九州</div>
        </div>
        <div css={styles.tableData}>
          <Link href='/hr-members/prefectures/40' passHref>
            <LinkButton fontSize='lg' width={80}>
              福岡県
            </LinkButton>
          </Link>
          <Link href='/hr-members/prefectures/41' passHref>
            <LinkButton fontSize='lg' width={80}>
              佐賀県
            </LinkButton>
          </Link>
          <Link href='/hr-members/prefectures/42' passHref>
            <LinkButton fontSize='lg' width={80}>
              長崎県
            </LinkButton>
          </Link>
          <Link href='/hr-members/prefectures/43' passHref>
            <LinkButton fontSize='lg' width={80}>
              熊本県
            </LinkButton>
          </Link>
          <Link href='/hr-members/prefectures/44' passHref>
            <LinkButton fontSize='lg' width={80}>
              大分県
            </LinkButton>
          </Link>
          <Link href='/hr-members/prefectures/45' passHref>
            <LinkButton fontSize='lg' width={80}>
              宮崎県
            </LinkButton>
          </Link>
          <Link href='/hr-members/prefectures/46' passHref>
            <LinkButton fontSize='lg' width={80} paddingLR={4}>
              鹿児島県
            </LinkButton>
          </Link>
          <Link href='/hr-members/prefectures/47' passHref>
            <LinkButton fontSize='lg' width={80}>
              沖縄県
            </LinkButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HrPrefecturesTable;
