import { css } from '@emotion/react';
import PoliticalPartyCard, { PoliticalPartyCardProps } from '../PoliticalPartyCard';

const styles = {
  wrap: css`
    display: flex;
    flex-wrap: wrap;
    /* justify-content: flex-start; */
    justify-content: center;
    align-items: flex-start;
    align-content: flex-start;
    gap: 20px;
    /* width: 940px; */
  `,
};

type PoliticalPartyTableProps = PoliticalPartyCardProps;

const PoliticalPartiesTable = ({
  politicalParties,
}: {
  politicalParties: PoliticalPartyTableProps[];
}) => {
  return (
    <div css={styles.wrap}>
      {politicalParties.map((politicalParty) => {
        return <PoliticalPartyCard key={politicalParty.politicalPartyId} {...politicalParty} />;
      })}
    </div>
  );
};

export default PoliticalPartiesTable;
