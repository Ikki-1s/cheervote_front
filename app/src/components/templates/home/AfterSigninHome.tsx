import { css } from '@emotion/react';
import Layout from 'components/templates/common/Layout';
import PageCenterWrap from 'components/templates/common/PageCenterWrap';
import AccordionMenu from 'components/molecules/AccordionMenu';
import AccordionDetail from 'components/organisms/AccordionDetail';
import ActiveCvTerms from 'components/organisms/ActiveCvTerms';
import UserConstituencyView from 'components/organisms/UserConstituencyView';

const styles = {
  wrap: css`
    display: flex;
    flex-direction: column;
    gap: 40px;
    margin: 30px 0;
    width: 100%;
    max-width: 1014px;
  `,
  h2: css`
    width: fit-content;
  `,
};

type AfterSigninHomeProps = {
  userConstituencyView: Parameters<typeof UserConstituencyView>[0];
  activeCvTerms: Parameters<typeof ActiveCvTerms>[0];
  hrAccordionDetail: Parameters<typeof AccordionDetail>[0][];
  hcAccordionDetail: Parameters<typeof AccordionDetail>[0][];
};

const AfterSigninHome = ({
  userConstituencyView,
  activeCvTerms,
  hrAccordionDetail,
  hcAccordionDetail,
}: AfterSigninHomeProps) => {
  return (
    <Layout>
      <PageCenterWrap>
        <div css={styles.wrap}>
          <UserConstituencyView {...userConstituencyView} />
          <h2 css={styles.h2}>マイ選挙区議員</h2>
          <ActiveCvTerms {...activeCvTerms} />
          <div>
            <AccordionMenu title='マイ選挙区の衆議院議員' defaultIsOpened>
              {hrAccordionDetail.map((data) => {
                return <AccordionDetail key={data.politicianListData.politicianId} {...data} />;
              })}
            </AccordionMenu>
          </div>
          <div>
            <AccordionMenu title='マイ選挙区の参議院議員' defaultIsOpened>
              {hcAccordionDetail.map((data) => {
                return <AccordionDetail key={data.politicianListData.politicianId} {...data} />;
              })}
            </AccordionMenu>
          </div>
        </div>
      </PageCenterWrap>
    </Layout>
  );
};

export default AfterSigninHome;
