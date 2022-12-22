import { NextPage } from 'next';
import Head from 'next/head';
import Layout, { siteTitle } from 'components/layout';
import Link from 'next/link';

import ColorButton from 'components/atoms/ColorButton';
import { css } from '@emotion/react';
import CheervoteLogo from 'components/atoms/CheervoteLogo';
import LinkButton from 'components/atoms/LinkButton';
import UserIcon from 'components/atoms/UserIcon';
import SnsIcon from 'components/atoms/SnsIcon';
import RadioButtonIcon from 'components/atoms/RadioButtonIcon';
import NavigationMenuButton from 'components/atoms/NavigationMenuButton';
import NavigationDropDownButton from 'components/atoms/NavigationDropDownButton';
import UserDropDownMenu from 'components/molecules/UserDropDownMenu';
import AccordionMenu from 'components/molecules/AccordionMenu';

const Home: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <h1>CHEERVOTE</h1>
      <Link href='/' passHref>
        <ColorButton color='blue'>BlueButton</ColorButton>
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
      <SnsIcon snsType='home' url='http://localhost:8000' />
      <SnsIcon snsType='homeDisabled' url='http://localhost:8000' />
      <SnsIcon snsType='twitter' url='http://localhost:8000' />
      <SnsIcon snsType='youtube' url='http://localhost:8000' />
      <SnsIcon snsType='facebook' url='http://localhost:8000' />
      <SnsIcon snsType='instagram' url='http://localhost:8000' />
      <SnsIcon snsType='line' url='http://localhost:8000' />
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
        <NavigationDropDownButton url='#'>国会議員一覧</NavigationDropDownButton>
        <UserDropDownMenu>ユーザー名が１５文字以内の表示</UserDropDownMenu>
        <UserDropDownMenu>ユーザー名が１６文字以上の表示テキスト</UserDropDownMenu>
      </div>
      <br />
      <AccordionMenu>マイ選挙区の衆議院議員</AccordionMenu>
    </Layout>
  );
};

export default Home;
