import Link from 'next/link';
import { css } from '@emotion/react';
import { color, fontWeight, typography } from 'styles/theme';

const houseMembersStyles = {
  houseName: css`
    ${typography.sm}
  `,
  numberOfMembers: css`
    display: flex;
    justify-content: flex-end;
    ${typography.lg}
    ${fontWeight.bold}
    width: 33px;
  `,
  number: css`
    ${typography.xs}
    padding: 0px 0px 3px;
  `,
  membersWrap: css`
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    gap: 4px;
  `,
  wrap: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 5px;
  `,
};

type HouseMembersProps = {
  houseName: '衆議院' | '参議院';
  numberOfMembers: number;
};

const HouseMembers = ({ houseName, numberOfMembers }: HouseMembersProps) => {
  return (
    <div css={houseMembersStyles.wrap}>
      <span css={houseMembersStyles.houseName}>{houseName}</span>
      <div css={houseMembersStyles.membersWrap}>
        <span css={houseMembersStyles.numberOfMembers}>{numberOfMembers}</span>
        <span css={houseMembersStyles.number}>名</span>
      </div>
    </div>
  );
};

const cardStyles = {
  politicalParty: css`
    display: flex;
    justify-content: center;
    ${typography.lg}
    ${fontWeight.bold}
    width: 166px;
  `,
  wrap: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 300px;
    padding: 20px 12px 20px 12px;
    border: 1px solid ${color.gray};
    border-radius: 8px;
    color: ${color.text.normal};
    background-color: ${color.background.normal};
    &:hover {
      cursor: pointer;
      background-color: ${color.blue.hover};
    }
  `,
  houseMembersWrap: css`
    display: flex;
    flex-direction: column;
    gap: 6px;
  `,
};

export type PoliticalPartyCardProps = {
  politicalPartyId: number;
  politicalPartyName: string;
  numberOfHrMembers: number;
  numberOfHcMembers: number;
  url: string;
};

const PoliticalPartyCard = ({
  politicalPartyName,
  numberOfHrMembers,
  numberOfHcMembers,
  url,
}: PoliticalPartyCardProps) => {
  return (
    <Link href={url} passHref>
      <a css={cardStyles.wrap}>
        <div css={cardStyles.politicalParty}>{politicalPartyName}</div>
        <div css={cardStyles.houseMembersWrap}>
          <HouseMembers houseName='衆議院' numberOfMembers={numberOfHrMembers} />
          <HouseMembers houseName='参議院' numberOfMembers={numberOfHcMembers} />
        </div>
      </a>
    </Link>
  );
};

export default PoliticalPartyCard;
