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

const HcPrTable = () => {
  return (
    <div css={styles.wrap}>
      <Link href='/hc-members/pr' passHref>
        <LinkButton fontSize='lg'>全国比例選出議員</LinkButton>
      </Link>
    </div>
  );
};

export default HcPrTable;
