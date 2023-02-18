import Image from 'next/image';
import Link from 'next/link';
import { css } from '@emotion/react';
import { fontWeight, typography } from 'styles/theme';

const styles = {
  md: {
    imageWidth: 80,
    imageHeight: 80,
    nameKanji: css`
      ${typography.lg}
      ${fontWeight.bold}
    `,
    nameKana: css`
      ${typography.xs}
      ${fontWeight.bold}
    `,
    politicalParty: css`
      ${typography.xs}
    `,
    politicianName: css`
      display: flex;
      flex-direction: column;
      gap: 5px;
    `,
    divText: css`
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 5px;
    `,
    wrap: css`
      display: flex;
      align-items: center;
      gap: 40px;
    `,
  },
  sm: {
    imageWidth: 70,
    imageHeight: 70,
    nameKanji: css`
      ${typography.md}
      ${fontWeight.bold}
    `,
    nameKana: css`
      ${typography.xxs}
      ${fontWeight.bold}
    `,
    politicalParty: css`
      ${typography.xxs}
    `,
    politicianName: css`
      display: flex;
      flex-direction: column;
      gap: 3px;
    `,
    divText: css`
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 3px;
    `,
    wrap: css`
      display: flex;
      align-items: center;
      gap: 40px;
    `,
  },
  cursorPointer: css`
    cursor: pointer;
  `,
};

export type PoliticianListDataProps = {
  styleSize: 'md' | 'sm';
  displayImage: boolean;
  imageSrc?: string;
  politicianId: number;
  lastNameKanji: string;
  firstNameKanji: string;
  lastNameKana?: string;
  firstNameKana?: string;
  isPuttedLink?: boolean; // 親でLinkを貼る場合に本コンポーネントのリンクを貼らないためのスイッチ
  politicianUrl?: string;
  politicalParty?: string;
  politicalPartyUrl?: string;
};

const PoliticianListData = ({
  styleSize,
  displayImage,
  imageSrc,
  // politicianId,
  lastNameKanji,
  firstNameKanji,
  lastNameKana,
  firstNameKana,
  isPuttedLink,
  politicianUrl,
  politicalParty,
  politicalPartyUrl,
}: PoliticianListDataProps) => {
  return (
    <div css={styles[styleSize].wrap}>
      {displayImage && (
        <Image
          src={imageSrc ? imageSrc : '/UserImage.png'}
          alt='議員の顔写真'
          layout='fixed'
          width={styles[styleSize].imageWidth}
          height={styles[styleSize].imageHeight}
        />
      )}
      {isPuttedLink ? (
        <div css={styles[styleSize].divText}>
          {politicianUrl && (
            <Link href={politicianUrl} passHref>
              <a css={[styles[styleSize].politicianName, styles.cursorPointer]}>
                {lastNameKana && (
                  <span css={styles[styleSize].nameKana}>
                    {lastNameKana}
                    {firstNameKana && `　${firstNameKana}`}
                  </span>
                )}
                <span css={styles[styleSize].nameKanji}>
                  {lastNameKanji}
                  {firstNameKanji && `　${firstNameKanji}`}
                </span>
              </a>
            </Link>
          )}
          {politicalParty && politicalPartyUrl && (
            <Link href={politicalPartyUrl} passHref>
              <a css={[styles[styleSize].politicalParty, styles.cursorPointer]}>{politicalParty}</a>
            </Link>
          )}
        </div>
      ) : (
        <div css={styles[styleSize].divText}>
          <div css={styles[styleSize].politicianName}>
            {lastNameKana && (
              <span css={styles[styleSize].nameKana}>
                {lastNameKana}
                {firstNameKana && `　${firstNameKana}`}
              </span>
            )}
            <span css={styles[styleSize].nameKanji}>
              {lastNameKanji}
              {firstNameKanji && `　${firstNameKanji}`}
            </span>
          </div>
          {politicalParty && politicalPartyUrl && (
            <span css={styles[styleSize].politicalParty}>{politicalParty}</span>
          )}
        </div>
      )}
    </div>
  );
};

export default PoliticianListData;
