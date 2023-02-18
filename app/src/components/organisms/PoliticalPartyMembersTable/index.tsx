import Link from 'next/link';
import { css } from '@emotion/react';
import { color, fontWeight } from 'styles/theme';
import PoliticianListData, { PoliticianListDataProps } from '../PoliticianListData';

const styles = {
  wrap: css`
    width: 90%;
    max-width: 801px;
    padding-bottom: 20px;
    margin-top: 10px;
  `,
  recordWrap: css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 6px 60px 6px 70px;
    border-bottom: 2px solid ${color.gray};
    &:hover {
      background-color: ${color.blue.hover};
    }
    &:first-of-type {
      border-top: 2px solid ${color.gray};
    }
  `,
  electedArea: css`
    display: flex;
    /* justify-content: center; */
    /* padding: 10px; */
    width: 148px;
    ${fontWeight.bold}
  `,
};

export type PoliticalPartyMemberTableProps = {
  electedArea: string;
  politicianListData: Omit<
    PoliticianListDataProps,
    | 'styleSize'
    | 'displayImage'
    | 'isPuttedLink'
    | 'politicianUrl'
    | 'politicalParty'
    | 'politicalPartyUrl'
  > &
    Required<Pick<PoliticianListDataProps, 'politicianUrl'>>;
};

const PoliticalPartyMembersTable = ({
  politicalPartyMembers,
}: {
  politicalPartyMembers: PoliticalPartyMemberTableProps[];
}) => {
  return (
    <div css={styles.wrap}>
      {politicalPartyMembers.map((data) => {
        return (
          <Link
            href={data.politicianListData.politicianUrl}
            key={data.politicianListData.politicianId}
            passHref
          >
            <a css={styles.recordWrap}>
              <PoliticianListData styleSize='sm' displayImage={true} {...data.politicianListData} />
              <div css={styles.electedArea}>{data.electedArea}</div>
            </a>
          </Link>
        );
      })}
    </div>
  );
};

export default PoliticalPartyMembersTable;
