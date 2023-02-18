import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import {
  getPoliticalPartiesHavingActiveMembersIds,
  getPoliticalPartyHrMembers,
  getPoliticalPartyHcMembers,
  getPoliticalPartyName,
  valueof,
} from 'domains';
import { eliminateToHuKen } from 'utils';
import Template from 'components/templates/political-parties/PoliticalPartyMembers';

type Props = Parameters<typeof Template>[0];

interface Params extends ParsedUrlQuery {
  id: string;
}

const PoliticalPartyMember: NextPage<Props> = (props: Props) => {
  return <Template {...props} />;
};

export default PoliticalPartyMember;

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const paths = await getPoliticalPartiesHavingActiveMembersIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
  const politicalPartyName = await getPoliticalPartyName(params!.id);
  const hrMembers = await getPoliticalPartyHrMembers(params!.id);
  const hcMembers = await getPoliticalPartyHcMembers(params!.id);

  // 衆議院小選挙区選出議員
  const hrMembersFilterConstituencies = hrMembers.filter((data) => {
    return data.politician.hr_members[0].elected_system === 1;
  });

  const hrConstituenciesMembersTotal = hrMembersFilterConstituencies.length;

  const hrConstituenciesMembers: valueof<Pick<Props, 'hrConstituenciesMembers'>> = {
    total: hrConstituenciesMembersTotal,
    politicalPartyMembersTable: hrMembersFilterConstituencies.map((data) => {
      return {
        electedArea:
          eliminateToHuKen(data.politician.hr_members[0].hr_constituency!.prefecture.prefecture) +
          data.politician.hr_members[0].hr_constituency!.name,
        politicianListData: {
          imageSrc: data.politician.image ? data.politician.image : '',
          politicianId: data.politician.id,
          lastNameKanji: data.politician.last_name_kanji,
          firstNameKanji: data.politician.first_name_kanji ? data.politician.first_name_kanji : '',
          lastNameKana: data.politician.last_name_kana,
          firstNameKana: data.politician.first_name_kana ? data.politician.first_name_kana : '',
          politicianUrl: `/politicians/${data.politician.id}`,
        },
      };
    }),
  };

  // 衆議院比例ブロック選出議員
  const hrMembersFilterPrBlocks = hrMembers.filter((data) => {
    return data.politician.hr_members[0].elected_system === 2;
  });

  const hrPrBlocksMembersTotal = hrMembersFilterPrBlocks.length;

  const hrPrBlocksMembers: valueof<Pick<Props, 'hrPrBlocksMembers'>> = {
    total: hrPrBlocksMembersTotal,
    politicalPartyMembersTable: hrMembersFilterPrBlocks.map((data) => {
      return {
        electedArea: data.politician.hr_members[0].hr_pr_block!.block_name + 'ブロック',
        politicianListData: {
          imageSrc: data.politician.image ? data.politician.image : '',
          politicianId: data.politician.id,
          lastNameKanji: data.politician.last_name_kanji,
          firstNameKanji: data.politician.first_name_kanji ? data.politician.first_name_kanji : '',
          lastNameKana: data.politician.last_name_kana,
          firstNameKana: data.politician.first_name_kana ? data.politician.first_name_kana : '',
          politicianUrl: `/politicians/${data.politician.id}`,
        },
      };
    }),
  };

  // 参議院選挙区選出議員
  const hcMembersFilterConstituencies = hcMembers.filter((data) => {
    return data.politician.hc_members[0].elected_system === 1;
  });

  const hcConstituenciesMembersTotal = hcMembersFilterConstituencies.length;

  const hcConstituenciesMembers: valueof<Pick<Props, 'hcConstituenciesMembers'>> = {
    total: hcConstituenciesMembersTotal,
    politicalPartyMembersTable: hcMembersFilterConstituencies.map((data) => {
      return {
        electedArea: data.politician.hc_members[0].hc_constituency!.name,
        politicianListData: {
          imageSrc: data.politician.image ? data.politician.image : '',
          politicianId: data.politician.id,
          lastNameKanji: data.politician.last_name_kanji,
          firstNameKanji: data.politician.first_name_kanji ? data.politician.first_name_kanji : '',
          lastNameKana: data.politician.last_name_kana,
          firstNameKana: data.politician.first_name_kana ? data.politician.first_name_kana : '',
          politicianUrl: `/politicians/${data.politician.id}`,
        },
      };
    }),
  };

  // 参議院全国比例選出議員
  const hcMembersFilterPr = hcMembers.filter((data) => {
    return data.politician.hc_members[0].elected_system === 2;
  });

  const hcPrMembersTotal = hcMembersFilterPr.length;

  const hcPrMembers: valueof<Pick<Props, 'hcPrMembers'>> = {
    total: hcPrMembersTotal,
    politicalPartyMembersTable: hcMembersFilterPr.map((data) => {
      return {
        electedArea: '全国比例選出',
        politicianListData: {
          imageSrc: data.politician.image ? data.politician.image : '',
          politicianId: data.politician.id,
          lastNameKanji: data.politician.last_name_kanji,
          firstNameKanji: data.politician.first_name_kanji ? data.politician.first_name_kanji : '',
          lastNameKana: data.politician.last_name_kana,
          firstNameKana: data.politician.first_name_kana ? data.politician.first_name_kana : '',
          politicianUrl: `/politicians/${data.politician.id}`,
        },
      };
    }),
  };

  return {
    props: {
      politicalPartyName,
      hrConstituenciesMembers,
      hrPrBlocksMembers,
      hcConstituenciesMembers,
      hcPrMembers,
    },
  };
};
