import Link from 'next/link';
import { css } from '@emotion/react';
import { color, fontWeight, typography } from 'styles/theme';
import PoliticianListData, { PoliticianListDataProps } from '../PoliticianListData';

const styles = {
  wrap: css`
    width: 801px;
    padding: 30px 0px;
  `,
  recordWrap: css`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px 50px 10px 50px;
    gap: 50px;
    border-bottom: 2px solid ${color.gray};
    &:hover {
      background-color: ${color.blue.hover};
    }
    &:first-of-type {
      border-top: 2px solid ${color.gray};
    }
  `,
  hrConstituency: css`
    width: 72px;
    text-align: center;
    ${typography.heading3}
    ${fontWeight.bold}
  `,
  politicianListData: css`
    padding: 0px 24px;
  `,
};

// export type HrMemberOfPrefectureTableProps = {
type HrMemberOfPrefectureTableProps = {
  hrConstituency: {
    id: number;
    name: string;
  };
  politicianListData: Omit<
    PoliticianListDataProps,
    'styleSize' | 'displayImage' | 'isPuttedLink' | 'politicianUrl'
  > &
    Required<Pick<PoliticianListDataProps, 'politicianUrl'>>;
};

const HrMembersOfPrefectureTable = ({
  hrMembersOfPrefecture,
}: {
  hrMembersOfPrefecture: HrMemberOfPrefectureTableProps[];
}) => {
  return (
    <div css={styles.wrap}>
      {hrMembersOfPrefecture.map((data) => {
        return (
          <Link
            href={data.politicianListData.politicianUrl}
            key={data.politicianListData.politicianId}
            passHref
          >
            <a css={styles.recordWrap}>
              <div css={styles.hrConstituency}>{data.hrConstituency.name}</div>
              <div css={styles.politicianListData}>
                <PoliticianListData
                  styleSize='md'
                  displayImage={true}
                  {...data.politicianListData}
                />
              </div>
            </a>
          </Link>
        );
      })}
    </div>
  );
};

export default HrMembersOfPrefectureTable;
