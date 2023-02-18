import { ReactNode } from 'react';
import { css } from '@emotion/react';
import Header from 'components/ecosystems/Header';
import Footer from 'components/organisms/Footer';
import MainContainer from './MainContainer';

const styles = {
  container: css`
    min-height: 100vh;
    position: relative;
    padding-bottom: 100px;
    box-sizing: border-box;
  `,
};

type Props = {
  children: ReactNode;
  isNotAppliedMainContainer?: boolean;
};

const Layout = ({ children, isNotAppliedMainContainer }: Props) => {
  return (
    <div css={styles.container}>
      <Header />
      <main>
        {isNotAppliedMainContainer ? children : <MainContainer>{children}</MainContainer>}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
