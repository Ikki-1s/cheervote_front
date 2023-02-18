import Image from 'next/image';
import { css } from '@emotion/react';
import { typography } from 'styles/theme';
import Link from 'next/link';

const styles = {
  wrap: css`
    display: flex;
    gap: 40px;
  `,
  image: {
    width: 140,
    height: 140,
  },
  textWrap: css`
    display: flex;
    flex-direction: column;
    gap: 14px;
  `,
  politicianNameWrap: css`
    display: flex;
    align-items: baseline;
    gap: 24px;
  `,
  nameKanji: css`
    ${typography.heading2}
  `,
  house: css`
    ${typography.heading3}
  `,
  electedInfoWrap: css`
    display: flex;
    align-items: flex-end;
    gap: 10px;
  `,
  electedInfo: css`
    display: flex;
    align-items: baseline;
    gap: 10px;
  `,
  electedArea: css`
    ${typography.lg}
  `,
  election: css`
    ${typography.md}
  `,
  dualCandidate: css`
    ${typography.md}
  `,
  politicalParty: css`
    ${typography.md}
    width: fit-content;
  `,
};

type CvPoliticianBasicInfoProps = {
  politician: {
    id: number;
    lastNameKanji: string;
    firstNameKanji?: string;
    image?: string;
  };
  politicalParty: {
    id: number;
    nameKanji: string;
  };
  activeElectionData: {
    whichHouse: 'hc' | 'hr';
    electedArea: string;
    dualCandidacyArea?: string;
  };
};

const CvPoliticianBasicInfo = ({
  politician,
  politicalParty,
  activeElectionData,
}: CvPoliticianBasicInfoProps) => {
  return (
    <div css={styles.wrap}>
      <Image
        src={politician.image ? politician.image : '/UserImage.png'}
        alt='議員の顔写真'
        layout='fixed'
        width={styles.image.width}
        height={styles.image.height}
      />
      <div css={styles.textWrap}>
        <div css={styles.politicianNameWrap}>
          <Link href={`/politicians/${politician.id}`} passHref>
            <a css={styles.nameKanji}>
              {politician.lastNameKanji}
              {politician.firstNameKanji && ` ${politician.firstNameKanji}`}
            </a>
          </Link>
          <span css={styles.house}>
            {activeElectionData.whichHouse === 'hc' ? '参議院' : '衆議院'}議員
          </span>
        </div>
        <div css={styles.electedInfoWrap}>
          <div css={styles.electedInfo}>
            <span css={styles.electedArea}>{activeElectionData.electedArea}</span>
            <span css={styles.election}>選出</span>
          </div>
          {activeElectionData.dualCandidacyArea && (
            <div css={styles.dualCandidate}>
              （小選挙区：{activeElectionData.dualCandidacyArea} 重複立候補者）
            </div>
          )}
        </div>
        <Link href={`/political-parties/${politicalParty.id}`} passHref>
          <a css={styles.politicalParty}>{politicalParty.nameKanji}</a>
        </Link>
      </div>
    </div>
  );
};

export default CvPoliticianBasicInfo;
