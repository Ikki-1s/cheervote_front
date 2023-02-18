import Link from 'next/link';
import { css } from '@emotion/react';
import { color } from 'styles/theme';
import PoliticianListData, { PoliticianListDataProps } from '../PoliticianListData';

const styles = {
  wrap: css`
    width: 801px;
    padding: 30px 0px;
  `,
  recordWrap: css`
    display: flex;
    /* flex-direction: row; */
    /* align-items: center; */
    padding: 10px 0px 10px 50px;
    border-bottom: 2px solid ${color.gray};
    &:hover {
      background-color: ${color.blue.hover};
    }
    &:first-of-type {
      border-top: 2px solid ${color.gray};
    }
  `,
};

type HrMemberOfPrBlockTableProps = {
  politicianListData: Omit<
    PoliticianListDataProps,
    'styleSize' | 'displayImage' | 'isPuttedLink' | 'politicianUrl'
  > &
    Required<Pick<PoliticianListDataProps, 'politicianUrl'>>;
};

const HrMembersOfPrBlockTable = ({
  hrMembersOfPrBlock,
}: {
  hrMembersOfPrBlock: HrMemberOfPrBlockTableProps[];
}) => {
  return (
    <div css={styles.wrap}>
      {hrMembersOfPrBlock.map((data) => {
        return (
          <Link
            href={data.politicianListData.politicianUrl}
            key={data.politicianListData.politicianId}
            passHref
          >
            <a css={styles.recordWrap}>
              <PoliticianListData styleSize='md' displayImage={true} {...data.politicianListData} />
            </a>
          </Link>
        );
      })}
    </div>
  );
};

export default HrMembersOfPrBlockTable;
