import Link from 'next/link';
import { GetStaticProps, NextPage } from 'next';

import Layout from 'components/layout';
import { getPoliticalPartiesHavingActiveMembersData } from 'libs/politicalParties';

import { PoliticalPartyHavingActiveMember } from 'types';

const PoliticalParty: NextPage<Props> = ({ politicalParties }) => {
  return (
    <Layout>
      <h1 className='flex justify-center m-2 text-6xl font-semibold tracking-wider leading-tight'>
        政党別国会議員
      </h1>
      <ul>
        {politicalParties.map((politicalParty) => (
          <li key={politicalParty.id.toString()}>
            <Link href={`/political-parties/${politicalParty.id}`}>
              <a>{politicalParty.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default PoliticalParty;

type Props = {
  politicalParties: PoliticalPartyHavingActiveMember[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const politicalParties = await getPoliticalPartiesHavingActiveMembersData();
  return {
    props: {
      politicalParties,
    },
  };
};
