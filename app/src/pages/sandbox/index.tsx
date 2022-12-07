import { NextPage } from 'next';
import Head from 'next/head';
import Layout, { siteTitle } from 'components/layout';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

const largeFont = css`
  font-size: 54px;

  @media (min-width: 768px) {
    font-size: 72px;
  }
`;

const hello = css`
  ${largeFont}
  color: blue;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: lightblue;
  font-size: 24px;
  border-radius: 4px;
  color: black;
  font-weight: bold;
  &:hover {
    color: white;
  }
`;

const Home: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <h1 css={hello}>CHEERVOTE</h1>
      <Button>ボタン</Button>
    </Layout>
  );
};

export default Home;
