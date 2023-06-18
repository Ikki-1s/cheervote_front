import { css } from '@emotion/react';
import Image from 'next/image';
import { color, fontWeight, typography } from 'styles/theme';
import { ageCalculation } from 'utils/ageCaluculation';
import SnsIcon from 'components/atoms/SnsIcon';
import PoliticianNoImageIcon from '/public/PoliticianNoImageIcon.svg';

const styles = {
  wrap: css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 40px;
  `,
  titleWrap: css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  `,
  politicianNameWrap: css`
    display: flex;
    /* flex-direction: row; */
    align-items: center;
    gap: 30px;
  `,
  // nameKanji: css`
  //   ${typography.heading1}
  // `,
  nameKana: css`
    ${typography.heading3}
    margin-top: 10px;
  `,
  electedInfoWrap: css`
    display: flex;
    align-items: flex-end;
    gap: 10px;
  `,
  electedInfo: css`
    display: flex;
    /* align-items: flex-end; */
    align-items: baseline;
    gap: 10px;
  `,
  house: css`
    ${typography.heading3}
  `,
  electedArea: css`
    ${typography.heading3}
  `,
  election: css`
    ${typography.lg}
  `,
  dualCandidate: css`
    ${typography.lg}
  `,
  detailInfoWrap: css`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 50px;
    ${typography.lg}
  `,
  image: {
    width: 200,
    height: 200,
  },
  detailTableWrap: css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  `,
  rowWrap: css`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px 20px;
    gap: 40px;
    width: 720px;
    min-height: 70px;
    border-bottom: 1px solid ${color.gray};
    &:first-of-type {
      border-top: 1px solid ${color.gray};
    }
  `,
  rowTitle: css`
    display: flex;
    flex-direction: row;
    justify-content: center;
    ${typography.lg}
    ${fontWeight.bold}
    width: 110px;
  `,
  rowData: css`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 30px;
    ${typography.md}
    width: 530px;
  `,
};

export type PoliticianBasicInfoTableProps = {
  politician: {
    lastNameKanji: string;
    firstNameKanji?: string;
    lastNameKana: string;
    firstNameKana?: string;
    image?: string;
    birthday?: string; // 例. "1990-12-31"
    career?: string;
    website?: string;
    twitter?: string;
    youtube?: string;
    facebook?: string;
    instagram?: string;
    line?: string;
  };
  politicalParty: {
    name: string;
  };
  activeElectionData: {
    whichHouse: 'hc' | 'hr';
    electedArea: string;
    dualCandidacyArea?: string;
  };
};

const PoliticianBasicInfoTable = ({
  politician,
  politicalParty,
  activeElectionData,
}: PoliticianBasicInfoTableProps) => {
  return (
    <div css={styles.wrap}>
      <div css={styles.titleWrap}>
        <div css={styles.politicianNameWrap}>
          <h1>
            {/* <span css={styles.nameKanji}> */}
            {politician.lastNameKanji}
            {politician.firstNameKanji && ` ${politician.firstNameKanji}`}
            {/* </span> */}
          </h1>
          <div css={styles.nameKana}>
            {politician.lastNameKana}
            {politician.firstNameKana && ` ${politician.firstNameKana}`}
          </div>
        </div>
        <div css={styles.electedInfoWrap}>
          <div css={styles.electedInfo}>
            <span css={styles.house}>
              {activeElectionData.whichHouse === 'hc' ? '参議院' : '衆議院'}議員
            </span>
            <span css={styles.electedArea}>{activeElectionData.electedArea}</span>
            <span css={styles.election}>選出</span>
          </div>
          {activeElectionData.dualCandidacyArea && (
            <div css={styles.dualCandidate}>
              （小選挙区：{activeElectionData.dualCandidacyArea} 重複立候補者）
            </div>
          )}
        </div>
      </div>
      <div css={styles.detailInfoWrap}>
        {politician.image ? (
          <Image
            src={politician.image}
            alt='議員の顔写真'
            layout='fixed'
            width={styles.image.width}
            height={styles.image.height}
          />
        ) : (
          <PoliticianNoImageIcon width={styles.image.width} height={styles.image.height} />
        )}
        <div css={styles.detailTableWrap}>
          <div css={styles.rowWrap}>
            <div css={styles.rowTitle}>所属政党</div>
            <div css={styles.rowData}>{politicalParty.name}</div>
          </div>
          <div css={styles.rowWrap}>
            <div css={styles.rowTitle}>生年月日</div>
            <div css={styles.rowData}>
              {politician.birthday
                ? `${politician.birthday.replace(
                    /([0-9]+)-0*([0-9]+)-0*([0-9]+)/,
                    '$1年$2月$3日',
                  )}（${ageCalculation(politician.birthday)}歳）`
                : '―'}
            </div>
          </div>
          <div css={styles.rowWrap}>
            <div css={styles.rowTitle}>経歴</div>
            <div css={styles.rowData}>{politician.career ? politician.career : '―'}</div>
          </div>
          <div css={styles.rowWrap}>
            <div css={styles.rowTitle}>公式サイト</div>
            <div css={styles.rowData}>
              {politician.website ? <SnsIcon snsType='home' url={politician.website} /> : '―'}
            </div>
          </div>
          <div css={styles.rowWrap}>
            <div css={styles.rowTitle}>SNS</div>
            <div css={styles.rowData}>
              {!politician.twitter &&
                !politician.youtube &&
                !politician.facebook &&
                !politician.instagram &&
                !politician.line && <a>―</a>}
              {politician.twitter && <SnsIcon snsType='twitter' url={politician.twitter} />}
              {politician.youtube && <SnsIcon snsType='youtube' url={politician.youtube} />}
              {politician.facebook && <SnsIcon snsType='facebook' url={politician.facebook} />}
              {politician.instagram && <SnsIcon snsType='instagram' url={politician.instagram} />}
              {politician.line && <SnsIcon snsType='line' url={politician.line} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoliticianBasicInfoTable;
