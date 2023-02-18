import { css } from '@emotion/react';
import PoliticalPartyMembersTable from 'components/organisms/PoliticalPartyMembersTable';
import Layout from 'components/templates/common/Layout';
import { valueof } from 'domains';
import { fontWeight, typography } from 'styles/theme';
import PageCenterWrap from '../common/PageCenterWrap';

const styles = {
  totalWrap: css`
    display: flex;
    align-items: baseline;
    gap: 4px;
  `,
  totalCount: css`
    ${typography.heading3}
    ${fontWeight.bold}
  `,
  h3TitleWrap: css`
    display: flex;
    align-items: center;
    /* padding: 10px 0px 0px 40px; */
    margin: 16px 0 0 0;
    gap: 30px;
  `,
  h3: css`
    ${fontWeight.bold}
  `,
  mei: css`
    ${typography.md}
  `,
  nonMenberWrap: css`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 86px;
    width: 70%;
    max-width: 801px;
  `,
};

type PoliticalPartyMembersTable = valueof<
  Pick<Parameters<typeof PoliticalPartyMembersTable>[0], 'politicalPartyMembers'>
>;

type PoliticalPartyMembersTemplateProps = {
  politicalPartyName: string;
  hrConstituenciesMembers: {
    total: number;
    politicalPartyMembersTable: PoliticalPartyMembersTable;
  };
  hrPrBlocksMembers: {
    total: number;
    politicalPartyMembersTable: PoliticalPartyMembersTable;
  };
  hcConstituenciesMembers: {
    total: number;
    politicalPartyMembersTable: PoliticalPartyMembersTable;
  };
  hcPrMembers: {
    total: number;
    politicalPartyMembersTable: PoliticalPartyMembersTable;
  };
};

const PoliticalPartyMembers = ({
  politicalPartyName,
  hrConstituenciesMembers,
  hrPrBlocksMembers,
  hcConstituenciesMembers,
  hcPrMembers,
}: PoliticalPartyMembersTemplateProps) => {
  return (
    <Layout>
      <h1>{politicalPartyName}</h1>
      <h2>衆議院</h2>
      <div css={styles.h3TitleWrap}>
        <h3 css={styles.h3}>小選挙区選出</h3>
        {hrConstituenciesMembers.total > 0 && (
          <div css={styles.totalWrap}>
            <span css={styles.totalCount}>{hrConstituenciesMembers.total}</span>
            <span css={styles.mei}>名</span>
          </div>
        )}
      </div>
      <PageCenterWrap>
        {hrConstituenciesMembers.politicalPartyMembersTable.length ? (
          <PoliticalPartyMembersTable
            politicalPartyMembers={hrConstituenciesMembers.politicalPartyMembersTable}
          />
        ) : (
          <div css={styles.nonMenberWrap}>対象の議員はいません</div>
        )}
      </PageCenterWrap>
      <div css={styles.h3TitleWrap}>
        <h3 css={styles.h3}>比例ブロック選出</h3>
        {hrPrBlocksMembers.total > 0 && (
          <div css={styles.totalWrap}>
            <span css={styles.totalCount}>{hrPrBlocksMembers.total}</span>
            <span css={styles.mei}>名</span>
          </div>
        )}
      </div>
      <PageCenterWrap>
        {hrPrBlocksMembers.politicalPartyMembersTable.length ? (
          <PoliticalPartyMembersTable
            politicalPartyMembers={hrPrBlocksMembers.politicalPartyMembersTable}
          />
        ) : (
          <div css={styles.nonMenberWrap}>対象の議員はいません</div>
        )}
      </PageCenterWrap>
      <h2>参議院</h2>
      <div css={styles.h3TitleWrap}>
        <h3 css={styles.h3}>選挙区選出</h3>
        {hcConstituenciesMembers.total > 0 && (
          <div css={styles.totalWrap}>
            <span css={styles.totalCount}>{hcConstituenciesMembers.total}</span>
            <span css={styles.mei}>名</span>
          </div>
        )}
      </div>
      <PageCenterWrap>
        {hcConstituenciesMembers.politicalPartyMembersTable.length ? (
          <PoliticalPartyMembersTable
            politicalPartyMembers={hcConstituenciesMembers.politicalPartyMembersTable}
          />
        ) : (
          <div css={styles.nonMenberWrap}>対象の議員はいません</div>
        )}
      </PageCenterWrap>
      <div css={styles.h3TitleWrap}>
        <h3 css={styles.h3}>全国比例選出</h3>
        {hcPrMembers.total > 0 && (
          <div css={styles.totalWrap}>
            <span css={styles.totalCount}>{hcPrMembers.total}</span>
            <span css={styles.mei}>名</span>
          </div>
        )}
      </div>
      <PageCenterWrap>
        {hcPrMembers.politicalPartyMembersTable.length ? (
          <PoliticalPartyMembersTable
            politicalPartyMembers={hcPrMembers.politicalPartyMembersTable}
          />
        ) : (
          <div css={styles.nonMenberWrap}>対象の議員はいません</div>
        )}
      </PageCenterWrap>
    </Layout>
  );
};

export default PoliticalPartyMembers;
