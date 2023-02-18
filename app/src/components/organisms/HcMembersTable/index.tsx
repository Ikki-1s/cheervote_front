import Link from 'next/link';
import { css } from '@emotion/react';
import { color, fontWeight, typography } from 'styles/theme';
import { HcElectionTime } from 'domains';
import PoliticianListData, { PoliticianListDataProps } from '../PoliticianListData';

const styles = {
  wrap: css`
    width: 801px;
    padding: 30px 0px;
  `,
  recordWrap: css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    padding: 10px 50px 10px 50px;
    gap: 10px;
    border-bottom: 2px solid ${color.gray};
    &:hover {
      background-color: ${color.blue.hover};
    }
    &:first-of-type {
      border-top: 2px solid ${color.gray};
    }
  `,
  termWrap: css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 4px 10px;
    gap: 2px;
  `,
  term: css`
    ${typography.xs}
    ${fontWeight.bold}
  `,
  electionDate: css`
    ${typography.xs}
  `,
  expirationDate: css`
    ${typography.xs}
  `,
};

type HcMemberTableProps = {
  hcElectionTime: HcElectionTime;
  politicianListData: Omit<
    PoliticianListDataProps,
    'styleSize' | 'displayImage' | 'isPuttedLink' | 'politicianUrl'
  > &
    Required<Pick<PoliticianListDataProps, 'politicianUrl'>>;
};

const HcMembersTable = ({ hcMembers }: { hcMembers: HcMemberTableProps[] }) => {
  return (
    <div css={styles.wrap}>
      {hcMembers.map((data) => {
        return (
          <Link
            href={data.politicianListData.politicianUrl}
            key={data.politicianListData.politicianId}
            passHref
          >
            <a css={styles.recordWrap}>
              <PoliticianListData styleSize='md' displayImage={true} {...data.politicianListData} />
              <div css={styles.termWrap}>
                <div css={styles.term}>任期</div>
                <div css={styles.electionDate}>
                  {data.hcElectionTime.election_date.replace(
                    /([0-9]+)-([0-9]+)-([0-9]+)/,
                    '$1年$2月$3日',
                  )}
                </div>
                <div css={styles.expirationDate}>
                  〜{' '}
                  {data.hcElectionTime.expiration_date &&
                    data.hcElectionTime.expiration_date.replace(
                      /([0-9]+)-0*([0-9]+)-0*([0-9]+)/,
                      '$1年$2月$3日',
                    )}
                </div>
              </div>
            </a>
          </Link>
        );
      })}
    </div>
  );
};

export default HcMembersTable;
