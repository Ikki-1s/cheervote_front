import { css } from '@emotion/react';
import PoliticalPartyCard, { PoliticalPartyCardProps } from '../PoliticalPartyCard';

const styles = {
  wrap: css`
    display: flex;
    justify-content: center;
  `,
  container: css`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 26px;
    &::before {
      content: '';
      display: block;
      width: 300px;
      order: 1;
    }
    &::after {
      content: '';
      display: block;
      width: 300px;
    }
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
      <div css={styles.container}>
        {politicalParties.map((politicalParty) => {
          return <PoliticalPartyCard key={politicalParty.politicalPartyId} {...politicalParty} />;
        })}
      </div>
    </div>
  );
};

export default PoliticalPartiesTable;
