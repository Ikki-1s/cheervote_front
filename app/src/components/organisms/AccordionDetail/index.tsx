import Link from 'next/link';
import { css } from '@emotion/react';
import ColorButton from 'components/atoms/ColorButton';
import { color, fontWeight, typography } from 'styles/theme';
import PoliticianListData, {
  PoliticianListDataProps,
} from 'components/organisms/PoliticianListData';

const styles = {
  wrap: css`
    display: flex;
    align-items: center;
    padding: 20px 40px;
    gap: 20px;
    background: ${color.white};
    /* position: relative; */
    border-width: 0px 1px 1px 1px;
    border-style: solid;
    border-color: ${color.gray};
    &:last-of-type {
      border-width: 0px 1px 1px 1px;
      border-style: solid;
      border-color: ${color.gray};
      border-radius: 0px 0px 6px 6px;
    }
  `,
  electedArea: css`
    display: flex;
    justify-content: center;
    width: 162px;
    ${typography.md}
  `,
  politicianName: css`
    ${typography.md}
    ${fontWeight.bold}
  `,
};

export type AccordionDetailProps = {
  voteStatus: 'unvoted' | 'voted' | 'out_of_term';
  cheervoteUrl?: string;
  electedArea: string;
  politicianListData: Omit<
    PoliticianListDataProps,
    'styleSize' | 'displayImage' | 'isPuttedLink' | 'politicianUrl'
  > &
    Required<Pick<PoliticianListDataProps, 'politicianUrl'>>;
};

const AccordionDetail = ({
  voteStatus,
  cheervoteUrl,
  electedArea,
  politicianListData,
}: AccordionDetailProps) => {
  return (
    <div css={styles.wrap}>
      {voteStatus === 'unvoted' && cheervoteUrl && (
        <Link href={cheervoteUrl} passHref>
          <ColorButton color='pink' width={100}>
            投票する
          </ColorButton>
        </Link>
      )}
      {voteStatus === 'voted' && (
        <ColorButton color='disabled' width={100}>
          投票済み
        </ColorButton>
      )}
      {voteStatus === 'out_of_term' && (
        <ColorButton color='disabled' width={100}>
          受付期間外
        </ColorButton>
      )}
      <span css={styles.electedArea}>{electedArea}</span>
      <PoliticianListData
        styleSize='sm'
        displayImage={false}
        politicianId={politicianListData.politicianId}
        lastNameKanji={politicianListData.lastNameKanji}
        firstNameKanji={politicianListData.firstNameKanji}
        isPuttedLink
        politicianUrl={politicianListData.politicianUrl}
        politicalParty={politicianListData.politicalParty}
        politicalPartyUrl={politicianListData.politicalPartyUrl}
      />
    </div>
  );
};

export default AccordionDetail;
