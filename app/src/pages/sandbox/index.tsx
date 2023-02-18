import { NextPage } from 'next';
import Head from 'next/head';
import { siteTitle } from 'components/layout';
import Link from 'next/link';
import ColorButton from 'components/atoms/ColorButton';
import { css } from '@emotion/react';
import CheervoteLogo from 'components/atoms/CheervoteLogo';
import LinkButton from 'components/atoms/LinkButton';
import UserIcon from 'components/atoms/UserIcon';
import SnsIcon from 'components/atoms/SnsIcon';
import RadioButtonIcon from 'components/molecules/RadioButtonAndLabel';
import NavigationMenuButton from 'components/atoms/NavigationMenuButton';
import NavigationDropDownButton from 'components/molecules/NavigationDropDownButton';
import AccordionMenu from 'components/molecules/AccordionMenu';
import PoliticianListData from 'components/organisms/PoliticianListData';
import PoliticalPartyCard from 'components/organisms/PoliticalPartyCard';
import AccordionDetail, { AccordionDetailProps } from 'components/organisms/AccordionDetail';
import NavigationDropDownDetail from 'components/atoms/NavigationDropDownDetail';
import Layout2 from 'components/layout2';
import HrMembersOfPrefectureTable, {
  HrMemberOfPrefectureTableProps,
} from 'components/organisms/HrMembersOfPrefectureTable';
import HrMembersOfPrBlockTable, {
  HrMemberOfPrBlockTableProps,
} from 'components/organisms/HrMembersOfPrBlockTable';
import HcMembersTable, { HcMemberTableProps } from 'components/organisms/HcMembersTable';
import PoliticalPartiesTable, {
  PoliticalPartyTableProps,
} from 'components/organisms/PoliticalPartiesTable';
import PoliticianBasicInformationTable, {
  PoliticianBasicInformationTableProps,
} from 'components/organisms/PoliticianBasicInfoTable';
import PoliticianCvResult, {
  PoliticianCvResultProps,
} from 'components/organisms/PoliticianCvResult';
import HrPrefecturesTable from 'components/organisms/HrPrefecturesTable';
import HrPrBlocksTable from 'components/organisms/HrPrBlocksTable';
import HcMembersOfConstituency from 'pages/hc-members/constituencies/[id]';
import HcConstituenciesTable from 'components/organisms/HcConstituenciesTable';
import HcPrTable from 'components/organisms/HcPrTable';
import PoliticalPartyMembersTable, {
  PoliticalPartyMemberTableProps,
} from 'components/organisms/PoliticalPartyMembersTable';
import Layout from 'components/templates/common/Layout';

const hrMembersOfPrefectureTableData: HrMemberOfPrefectureTableProps[] = [
  {
    hrConstituency: {
      id: 173,
      name: '１２区',
    },
    politicianListData: {
      politicianId: 272,
      lastNameKanji: '田村',
      firstNameKanji: '憲久',
      lastNameKana: 'たむら',
      firstNameKana: 'のりひさ',
      politicianUrl: '/politicians/272',
      politicalParty: '自由民主党',
      politicalPartyUrl: '/political-parties/2',
    },
  },
  {
    hrConstituency: {
      id: 174,
      name: '２区',
    },
    politicianListData: {
      politicianId: 139,
      lastNameKanji: '川崎',
      firstNameKanji: 'ひでと',
      lastNameKana: 'かわさき',
      firstNameKana: 'ひでと',
      politicianUrl: '/politicians/139',
      politicalParty: '自由民主党',
      politicalPartyUrl: '/political-parties/2',
    },
  },
  {
    hrConstituency: {
      id: 175,
      name: '３区',
    },
    politicianListData: {
      politicianId: 98,
      lastNameKanji: '岡田',
      firstNameKanji: '克也',
      lastNameKana: 'おかだ',
      firstNameKana: 'かつや',
      politicianUrl: '/politicians/98',
      politicalParty: '立憲民主党',
      politicalPartyUrl: '/political-parties/3',
    },
  },
  {
    hrConstituency: {
      id: 176,
      name: '４区',
    },
    politicianListData: {
      politicianId: 227,
      lastNameKanji: '鈴木',
      firstNameKanji: '英敬',
      lastNameKana: 'すずき',
      firstNameKana: 'えいけい',
      politicianUrl: '/politicians/227',
      politicalParty: '自由民主党',
      politicalPartyUrl: '/political-parties/2',
    },
  },
];

const hrMembersOfPrBlockTableData: HrMemberOfPrBlockTableProps[] = [
  {
    politicianListData: {
      politicianId: 272,
      lastNameKanji: '田村',
      firstNameKanji: '憲久',
      lastNameKana: 'たむら',
      firstNameKana: 'のりひさ',
      politicianUrl: '/politicians/272',
      politicalParty: '自由民主党',
      politicalPartyUrl: '/political-parties/2',
    },
  },
  {
    politicianListData: {
      politicianId: 139,
      lastNameKanji: '川崎',
      firstNameKanji: 'ひでと',
      lastNameKana: 'かわさき',
      firstNameKana: 'ひでと',
      politicianUrl: '/politicians/139',
      politicalParty: '自由民主党',
      politicalPartyUrl: '/political-parties/2',
    },
  },
  {
    politicianListData: {
      politicianId: 98,
      lastNameKanji: '岡田',
      firstNameKanji: '克也',
      lastNameKana: 'おかだ',
      firstNameKana: 'かつや',
      politicianUrl: '/politicians/98',
      politicalParty: '立憲民主党',
      politicalPartyUrl: '/political-parties/3',
    },
  },
  {
    politicianListData: {
      politicianId: 227,
      lastNameKanji: '鈴木',
      firstNameKanji: '英敬',
      lastNameKana: 'すずき',
      firstNameKana: 'えいけい',
      politicianUrl: '/politicians/227',
      politicalParty: '自由民主党',
      politicalPartyUrl: '/political-parties/2',
    },
  },
];

const hcMembersTableData: HcMemberTableProps[] = [
  {
    hcElectionTime: {
      id: 25,
      election_time: 25,
      announcement_date: '2019-7-4',
      election_date: '2019-7-21',
      expiration_date: '2025-7-28',
    },
    politicianListData: {
      politicianId: 570,
      lastNameKanji: '榛葉',
      firstNameKanji: '賀津也',
      lastNameKana: 'しんば',
      firstNameKana: 'かづや',
      politicianUrl: '/politicians/570',
      politicalParty: '国民民主党',
      politicalPartyUrl: '/political-parties/6',
    },
  },
  {
    hcElectionTime: {
      id: 26,
      election_time: 26,
      announcement_date: '2022-6-22',
      election_date: '2022-7-10',
      expiration_date: '2028-7-25',
    },
    politicianListData: {
      politicianId: 636,
      lastNameKanji: '平山',
      firstNameKanji: '佐知子',
      lastNameKana: 'ひらやま',
      firstNameKana: 'さちこ',
      politicianUrl: '/politicians/636',
      politicalParty: '無所属',
      politicalPartyUrl: '/political-parties/1',
    },
  },
  {
    hcElectionTime: {
      id: 25,
      election_time: 25,
      announcement_date: '2019-7-4',
      election_date: '2019-7-21',
      expiration_date: '2025-7-28',
    },
    politicianListData: {
      politicianId: 651,
      lastNameKanji: '牧野',
      firstNameKanji: 'たかお',
      lastNameKana: 'まきの',
      firstNameKana: 'たかお',
      politicianUrl: '/politicians/651',
      politicalParty: '自由民主党',
      politicalPartyUrl: '/political-parties/2',
    },
  },
  {
    hcElectionTime: {
      id: 26,
      election_time: 26,
      announcement_date: '2022-6-22',
      election_date: '2022-7-10',
      expiration_date: '2028-7-25',
    },
    politicianListData: {
      politicianId: 753,
      lastNameKanji: '若林',
      firstNameKanji: '洋平',
      lastNameKana: 'わかばやし',
      firstNameKana: 'ようへい',
      politicianUrl: '/politicians/753',
      politicalParty: '自由民主党',
      politicalPartyUrl: '/political-parties/2',
    },
  },
];

const accordionData: AccordionDetailProps[] = [
  {
    keyId: 1,
    voteStatus: 'unvoted',
    cheervoteUrl: '/cheervote?politician=488',
    electedArea: '岡山県',
    politicianListData: {
      politicianId: 488,
      lastNameKanji: '石井',
      firstNameKanji: '正弘',
      politicianUrl: '/politicians/488',
      politicalParty: '自由民主党',
      politicalPartyUrl: '/political-parties/2',
    },
  },
  {
    keyId: 2,
    voteStatus: 'voted',
    cheervoteUrl: '/cheervote?politician=515',
    electedArea: '岡山県',
    politicianListData: {
      politicianId: 515,
      lastNameKanji: '小野田',
      firstNameKanji: '紀美',
      politicianUrl: '/politicians/515',
      politicalParty: '自由民主党',
      politicalPartyUrl: '/political-parties/2',
    },
  },
];

const politicalPartiesTableData: PoliticalPartyTableProps[] = [
  {
    politicalPartyId: 2,
    politicalPartyName: '自由民主党',
    numberOfHrMembers: 333,
    numberOfHcMembers: 333,
    url: '/political-parties/2',
  },
  {
    politicalPartyId: 3,
    politicalPartyName: '立憲民主党',
    numberOfHrMembers: 333,
    numberOfHcMembers: 333,
    url: '/political-parties/3',
  },
  {
    politicalPartyId: 5,
    politicalPartyName: '日本維新の会',
    numberOfHrMembers: 333,
    numberOfHcMembers: 333,
    url: '/political-parties/5',
  },
  {
    politicalPartyId: 4,
    politicalPartyName: '公明党',
    numberOfHrMembers: 333,
    numberOfHcMembers: 333,
    url: '/political-parties/4',
  },
  {
    politicalPartyId: 6,
    politicalPartyName: '国民民主党',
    numberOfHrMembers: 333,
    numberOfHcMembers: 333,
    url: '/political-parties/6',
  },
  {
    politicalPartyId: 7,
    politicalPartyName: '日本共産党',
    numberOfHrMembers: 10,
    numberOfHcMembers: 11,
    url: '/political-parties/7',
  },
  {
    politicalPartyId: 1,
    politicalPartyName: '無所属',
    numberOfHrMembers: 3,
    numberOfHcMembers: 8,
    url: '/political-parties/1',
  },
  {
    politicalPartyId: 8,
    politicalPartyName: 'れいわ新選組',
    numberOfHrMembers: 3,
    numberOfHcMembers: 5,
    url: '/political-parties/8',
  },
  {
    politicalPartyId: 11,
    politicalPartyName: '無所属／有志の会',
    numberOfHrMembers: 5,
    numberOfHcMembers: 0,
    url: '/political-parties/11',
  },
  {
    politicalPartyId: 12,
    politicalPartyName: '無所属／沖縄の風',
    numberOfHrMembers: 0,
    numberOfHcMembers: 2,
    url: '/political-parties/12',
  },
  {
    politicalPartyId: 13,
    politicalPartyName: '無所属／碧水会',
    numberOfHrMembers: 0,
    numberOfHcMembers: 2,
    url: '/political-parties/13',
  },
  {
    politicalPartyId: 10,
    politicalPartyName: 'ＮＨＫ党',
    numberOfHrMembers: 0,
    numberOfHcMembers: 1,
    url: '/political-parties/10',
  },
  {
    politicalPartyId: 15,
    politicalPartyName: '参政党',
    numberOfHrMembers: 0,
    numberOfHcMembers: 1,
    url: '/political-parties/15',
  },
  {
    politicalPartyId: 14,
    politicalPartyName: '無所属／みんなの党',
    numberOfHrMembers: 0,
    numberOfHcMembers: 1,
    url: '/political-parties/14',
  },
];

const politicianBasicInformationTableData: PoliticianBasicInformationTableProps = {
  politician: {
    lastNameKanji: '逢沢',
    firstNameKanji: '一郎',
    lastNameKana: 'あいさわ',
    firstNameKana: 'いちろう',
    imageSrc: '',
    birthday: '1954-06-10',
    career:
      '経歴が複数行で入ります。経歴が複数行で入ります。経歴が複数行で入ります。経歴が複数行で入ります。経歴が複数行で入ります。経歴が複数行で入ります。経歴が複数行で入ります。経歴が複数行で入ります。経歴が複数行で入ります。経歴が複数行で入ります。経歴が複数行で入ります。経歴が複数行で入ります。経歴が複数行で入ります。経歴が複数行で入ります。経歴が複数行で入ります。経歴が複数行で入ります。経歴が複数行で入ります。経歴が複数行で入ります。',
    website: 'https://www.google.co.jp/',
    twitter: 'https://twitter.com/',
    youtube: 'https://www.youtube.com/',
    facebook: 'https://ja-jp.facebook.com/',
    instagram: 'https://www.instagram.com/',
    line: 'https://line.me/ja/',
  },
  politicalParty: {
    name: '自由民主党',
  },
  activeElectionData: {
    whichHouse: 'hr',
    electedArea: '岡山県１区',
    dualCandidacyArea: '愛知県１２区',
  },
};

const politicalPartyMembersTable: PoliticalPartyMemberTableProps[] = [
  {
    electedArea: '静岡県',
    politicianListData: {
      politicianId: 570,
      lastNameKanji: '榛葉',
      firstNameKanji: '賀津也',
      lastNameKana: 'しんば',
      firstNameKana: 'かづや',
      politicianUrl: '/politicians/570',
    },
  },
  {
    electedArea: '静岡県',
    politicianListData: {
      politicianId: 636,
      lastNameKanji: '平山',
      firstNameKanji: '佐知子',
      lastNameKana: 'ひらやま',
      firstNameKana: 'さちこ',
      politicianUrl: '/politicians/636',
    },
  },
  {
    electedArea: '静岡県',
    politicianListData: {
      politicianId: 651,
      lastNameKanji: '牧野',
      firstNameKanji: 'たかお',
      lastNameKana: 'まきの',
      firstNameKana: 'たかお',
      politicianUrl: '/politicians/651',
    },
  },
  {
    electedArea: '静岡県',
    politicianListData: {
      politicianId: 753,
      lastNameKanji: '若林',
      firstNameKanji: '洋平',
      lastNameKana: 'わかばやし',
      firstNameKana: 'ようへい',
      politicianUrl: '/politicians/753',
    },
  },
];

const Home: NextPage = () => {
  const handleClick = () => {
    console.log('テスト');
  };
  return (
    <Layout>
      {/* <Layout2> */}
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <h1>CHEERVOTE</h1>
      {/* <PoliticalPartyMembersTable politicalPartyMembersData={politicalPartyMembersTable} /> */}
      {/* <HcConstituenciesTable /> */}
      {/* <HcPrTable /> */}
      {/* <HrPrBlocksTable /> */}
      {/* <HrPrefecturesTable /> */}
      {/* <PoliticianBasicInformationTable
        politician={politicianBasicInformationTableData.politician}
        activeElectionData={politicianBasicInformationTableData.activeElectionData}
      /> */}
      {/* <PoliticianBasicInformationTable {...politicianBasicInformationTableData} /> */}
      {/* <PoliticalPartiesTable politicalParties={politicalPartiesTableData} /> */}
      {/* <HrMembersOfPrefectureTable hrMembersOfPrefectureData={hrMembersOfPrefectureTableData} /> */}
      {/* <HrMembersOfPrBlockTable hrMembersOfPrBlockData={hrMembersOfPrBlockTableData} /> */}
      {/* <HcMembersTable hcMembersData={hcMembersTableData} /> */}
      {/* <Header navigationDropDownData={navigationDropDownData} isLogin /> */}
      {/* <Header navigationDropDownData={navigationDropDownData} isLogin={false} /> */}
      {/* <NavigationDropDownButton title='国会議員一覧' icon={UserIcon}>
        <NavigationDropDownDetail title='衆議院議員' url='/hr-members' />
        <NavigationDropDownDetail title='参議院議員' url='/hc-members' />
        <NavigationDropDownDetail title='政党別国会議員' url='/political-parties' />
      </NavigationDropDownButton> */}
      <Link href='/' passHref>
        <ColorButton color='blue' onClick={handleClick}>
          BlueButton
        </ColorButton>
      </Link>
      <Link href='/' passHref>
        <ColorButton color='pink'>PinkButton</ColorButton>
      </Link>
      <ColorButton color='disabled'>DisabledButton</ColorButton>
      <br />
      <CheervoteLogo />
      <br />
      <Link href='/' passHref>
        <LinkButton>リンク</LinkButton>
      </Link>
      <br />
      <Link href='/' passHref>
        <LinkButton fontSize='lg' bold>
          リンク
        </LinkButton>
      </Link>
      <br />
      <Link href='/' passHref>
        <LinkButton fontSize='heading3'>リンク</LinkButton>
      </Link>
      <br />
      <Link href='/' passHref>
        <a>
          <UserIcon />
        </a>
      </Link>
      <UserIcon widthAndHeight={90} />
      <br />
      {/* <SnsIcon snsType='home' url='http://localhost:8000' />
      <SnsIcon snsType='homeDisabled' url='http://localhost:8000' />
      <SnsIcon snsType='twitter' url='http://localhost:8000' />
      <SnsIcon snsType='youtube' url='http://localhost:8000' />
      <SnsIcon snsType='facebook' url='http://localhost:8000' />
      <SnsIcon snsType='instagram' url='http://localhost:8000' />
      <SnsIcon snsType='line' url='http://localhost:8000' /> */}
      <br />
      <div>
        <RadioButtonIcon id='1' value='1'>
          大変評価する
        </RadioButtonIcon>
        <RadioButtonIcon id='2' value='2'>
          まあまあ評価する
        </RadioButtonIcon>
        <RadioButtonIcon id='3' value='3'>
          どちらでもない
        </RadioButtonIcon>
        <RadioButtonIcon id='4' value='4'>
          あまり評価しない
        </RadioButtonIcon>
        <RadioButtonIcon id='5' value='5'>
          全く評価しない
        </RadioButtonIcon>
      </div>
      <div
        css={css`
          display: flex;
        `}
      >
        <div
          css={css`
            padding: 10px 5px;
          `}
        >
          <NavigationMenuButton url='/'>メニュー</NavigationMenuButton>
        </div>
        <div
          css={css`
            padding: 10px 5px;
          `}
        >
          <NavigationMenuButton url='/'>メニュー</NavigationMenuButton>
        </div>
        <div
          css={css`
            padding: 10px 5px;
          `}
        >
          <NavigationMenuButton url='/' isSelected>
            メニュー
          </NavigationMenuButton>
        </div>
        {/* <NavigationDropDownButton url='#'>国会議員一覧</NavigationDropDownButton> */}
      </div>
      <br />
      <br />
      <AccordionMenu title='マイ選挙区の参議院議員' defaultIsOpened={false}>
        {accordionData.map((data) => {
          return <AccordionDetail key={data.keyId} {...data} />;
        })}
      </AccordionMenu>
      <br />
      <PoliticianListData
        styleSize='md'
        displayImage
        imageSrc='/UserIcon.svg'
        politicianId={1}
        lastNameKanji='逢沢'
        firstNameKanji='一郎'
        lastNameKana='あいさわ'
        firstNameKana='いちろう'
        politicianUrl='/politicians/1'
        politicalParty='自由民主党'
        politicalPartyUrl='/political-parties/2'
      />
      <br />
      <PoliticianListData
        styleSize='sm'
        displayImage={false}
        politicianId={1}
        lastNameKanji='逢沢'
        firstNameKanji='一郎'
        lastNameKana='あいさわ'
        firstNameKana='いちろう'
        isPuttedLink
        politicianUrl='/politicians/1'
        politicalParty='自由民主党'
        politicalPartyUrl='/political-parties/2'
      />
      <br />
      <PoliticalPartyCard
        politicalPartyId={1}
        politicalPartyName='政党名政党名政党名政党名政党名政党名'
        numberOfHrMembers={333}
        numberOfHcMembers={333}
        url='/'
      />
      <br />
      <PoliticalPartyCard
        politicalPartyId={2}
        politicalPartyName='自由民主党'
        numberOfHrMembers={33}
        numberOfHcMembers={3}
        url='/political-parties/2'
      />
      <br />
      {/* </Layout2> */}
    </Layout>
  );
};

export default Home;
