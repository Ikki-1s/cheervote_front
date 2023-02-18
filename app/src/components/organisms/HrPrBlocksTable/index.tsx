import Link from 'next/link';
import { css } from '@emotion/react';
import LinkButton from 'components/atoms/LinkButton';

const styles = {
  wrap: css`
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    align-content: flex-start;
    padding: 10px 0px;
    gap: 20px 23px;
    max-width: 805px;
  `,
};

const HrPrBlocksTable = () => {
  return (
    <div css={styles.wrap}>
      <Link href='/hr-members/pr-blocks/1' passHref>
        <LinkButton fontSize='lg' width={184}>
          北海道ブロック
        </LinkButton>
      </Link>
      <Link href='/hr-members/pr-blocks/2' passHref>
        <LinkButton fontSize='lg' width={184}>
          東北ブロック
        </LinkButton>
      </Link>
      <Link href='/hr-members/pr-blocks/3' passHref>
        <LinkButton fontSize='lg' width={184}>
          北関東ブロック
        </LinkButton>
      </Link>
      <Link href='/hr-members/pr-blocks/4' passHref>
        <LinkButton fontSize='lg' width={184}>
          南関東ブロック
        </LinkButton>
      </Link>
      <Link href='/hr-members/pr-blocks/5' passHref>
        <LinkButton fontSize='lg' width={184}>
          東京ブロック
        </LinkButton>
      </Link>
      <Link href='/hr-members/pr-blocks/6' passHref>
        <LinkButton fontSize='lg' width={184}>
          北陸信越ブロック
        </LinkButton>
      </Link>
      <Link href='/hr-members/pr-blocks/7' passHref>
        <LinkButton fontSize='lg' width={184}>
          東海ブロック
        </LinkButton>
      </Link>
      <Link href='/hr-members/pr-blocks/8' passHref>
        <LinkButton fontSize='lg' width={184}>
          近畿ブロック
        </LinkButton>
      </Link>
      <Link href='/hr-members/pr-blocks/9' passHref>
        <LinkButton fontSize='lg' width={184}>
          中国ブロック
        </LinkButton>
      </Link>
      <Link href='/hr-members/pr-blocks/10' passHref>
        <LinkButton fontSize='lg' width={184}>
          四国ブロック
        </LinkButton>
      </Link>
      <Link href='/hr-members/pr-blocks/11' passHref>
        <LinkButton fontSize='lg' width={184}>
          九州ブロック
        </LinkButton>
      </Link>
    </div>
  );
};

export default HrPrBlocksTable;
