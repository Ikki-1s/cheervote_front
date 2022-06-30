import { GetStaticProps, NextPage } from 'next';

import Layout from 'components/layout';
import { getHcMembresOfHcPrData } from 'libs/hcMembers';

import { HcMemberOfHcPr } from 'types/hcMember';

const HcPr: NextPage<Props> = ({ hcMembresOfHcPrData }) => {
  return (
    <Layout>
      <h1 className='flex justify-center m-2 text-6xl font-semibold tracking-wider leading-tight'>
        全国比例選出議員
      </h1>
      <ul>
        {hcMembresOfHcPrData.map((hcMember) => {
          return (
            <li key={hcMember.id.toString()}>
              {`${hcMember.politician.last_name_kanji} ${hcMember.politician.first_name_kanji} （${hcMember.politician.last_name_kana} ${hcMember.politician.first_name_kana}）`}
              {hcMember.politician.political_party_members.map((politicalPartyMembers) => {
                return `／ ${politicalPartyMembers.political_party.name_kanji}`;
              })}
              ／任期満了：
              {hcMember.hc_election_time.expiration_date.replace(
                /([0-9]+)-([0-9]+)-([0-9]+)/,
                '$1年$2月$3日',
              )}
            </li>
          );
        })}
      </ul>
    </Layout>
  );
};

export default HcPr;

type Props = {
  hcMembresOfHcPrData: HcMemberOfHcPr[];
};

export const getStaticProps: GetStaticProps = async () => {
  const hcMembresOfHcPrData = await getHcMembresOfHcPrData();
  return {
    props: {
      hcMembresOfHcPrData,
    },
  };
};
